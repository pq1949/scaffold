/**
 * todos列表类
 */
import PublishSubscribe from '../publishsubscribe/PublishSubscribe'

export default class TodosList {
  constructor () {
    console.log('TodosList create')
  }

  init ($container) {
    this._$container = $container
    let $html = $(this._getHtml())
    this.renderList()
    $container.html($html)
    this.bindEvent()
  }

  bindEvent () {
    this._$container.on('click', e => {
      let id = $(e.target).parent().parent().data('id')
      if (!id) {
        return
      }
      if ($(e.target).hasClass('delete')) {
        this.deleteTodo(id)
      } else if ($(e.target).hasClass('completed')) {
        this.completedTodo(id)
      }
    })
    if (this._isPC()) {
      this._$container.on('mouseover', e => {
        if ($(e.relatedTarget).hasClass('list-item-button') || $(e.relatedTarget).hasClass('delete') || $(e.relatedTarget).hasClass('completed')) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        if (!$(e.target).hasClass('list-group-item')) {
          return
        }
        $(e.target).find('.list-item-button').css({
          right: 0
        })
      })

      this._$container.on('mouseout', e => {
        if ($(e.relatedTarget).hasClass('list-item-button') || $(e.relatedTarget).hasClass('delete') || $(e.relatedTarget).hasClass('completed')) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        if (!$(e.target).hasClass('list-group-item')) {
          return
        }
        $(e.target).find('.list-item-button').css({
          right: '-5em'
        })
      })
    }

    if (!this._isPC()) {
      let moveX = 0
      this._$container.on('touchstart', e => {
        if (!$(e.target).hasClass('list-group-item')) {
          return
        }
        console.log('touchstart event', e)
        moveX = e.originalEvent.changedTouches[0].pageX
      })
      this._$container.on('touchmove', e => {
        if (!$(e.target).hasClass('list-group-item')) {
          return
        }
        console.log('touchmove event', e)
      })
      this._$container.on('touchend', e => {
        if (!$(e.target).hasClass('list-group-item')) {
          return
        }
        console.log('touchend event', e)
        if (moveX - 20 > e.originalEvent.changedTouches[0].pageX) {
          $(e.target).find('.list-item-button').css({
            right: 0
          })
        } else if (moveX + 20 < e.originalEvent.changedTouches[0].pageX) {
          $(e.target).find('.list-item-button').css({
            right: '-5em'
          })
        }
      })
    }

    PublishSubscribe.subscribe(PublishSubscribe.OnNewTodoEvent, (topic, args) => {
      this.appendTodo(args)
    })
  }

  renderList () {
    let todos = this._getTodos()
    todos.done(todos => {
      let html = ''
      for (let i = 0, iLen = todos.length; i < iLen; i++) {
        let title = Number(todos[i].isCompleted) === 1 ? `<s>${todos[i].title}</s>` : todos[i].title
        html += `<li class="list-group-item" data-id="${todos[i].id}">
                  <p>${title}</p>
                  <div class="btn-group list-item-button">
                    <span class="glyphicon glyphicon-minus-sign delete"></span>
                    <span class="glyphicon glyphicon-ok-sign completed"></span>
                  </div>
                </li>`
      }
      this._$container.find('ul').html(html)
    })
  }

  appendTodo (todo) {
    let html = `<li class="list-group-item" data-id="${todo.id}">
            <p>${todo.title}</p>
            <div class="btn-group list-item-button">
              <span class="glyphicon glyphicon-minus-sign delete"></span>
              <span class="glyphicon glyphicon-ok-sign completed"></span>
            </div>
        </li>`
    this._$container.find('ul').append(html)
  }

  deleteTodo (id) {
    var self = this
    let url = `http://192.168.251.35:9090/api/v1/todos/${id}`
    $.ajax({
      type: 'DELETE',
      url: url,
      success: function (data) {
        console.log(`delete id=${id} success`)
        self._$container.find(`li[data-id="${id}"]`).remove()
      },
      error: function (err) {
        console.log(`delete id=${id} fail,message:${err}`)
      }
    })
  }

  completedTodo (id) {
    var self = this
    let url = `http://192.168.251.35:9090/api/v1/todos/${id}`
    let data = {
      isCompleted: 1
    }
    $.ajax({
      type: 'PATCH',
      url: url,
      data: data,
      success: function (data) {
        console.log(`update id=${id} success`)
        let $p = self._$container.find(`li[data-id="${id}"] p`)
        $p.html(`<s>${$p.text()}</s>`)
      },
      error: function (err) {
        console.log(`update id=${id} fail,message ${err}`)
      }
    })
  }

  _getTodos () {
    let promise = $.getJSON('http://192.168.251.35:9090/api/v1/todos', result => {
      promise.done()
      return result
    })
    return promise
  }

  _getHtml () {
    let html = `
      <ul class="list-group" id="todosList">
      
      </ul>
    `
    return html
  }

  _isPC () {
    return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
  }

  destroy () {
    console.log('TodosList destroy')
  }
}
