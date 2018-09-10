/**
 * 新增todos类
 */
import PublishSubscribe from '../publishsubscribe/PublishSubscribe'

export default class NewTodos {
  constructor () {
    console.log('NewTodos create')
  }

  init ($container) {
    this._$container = $container
    $container.html(this._getHtml())
    this.bindEvent()
  }

  bindEvent () {
    this._$container.find('#confirm').on('click', e => {
      let title = this._$container.find('#newTitle').val()
      if (title.trim() === '') {
        this._$container.find('#alertTip').removeClass('hidden')
        setTimeout(() => {
          this._$container.find('#alertTip').addClass('hidden')
        }, 2000)
        return
      }
      this._$container.find('#newTitle').val('')
      $.post('http://192.168.251.35:9090/api/v1/todos', {title: title, isCompleted: 0}, data => {
        PublishSubscribe.publish(PublishSubscribe.OnNewTodoEvent, data)
        this._$container.find('#newTodosModal').modal('hide')
      })
    })
  }

  _getHtml () {
    let html = `
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="newTodosModal" tabindex="-1" role="dialog" aria-labelledby="newTodosModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              &times;
            </button>
            <h4 class="modal-title text-center" id="newTodosModalLabel">
              新增任务
            </h4>
          </div>
          <div class="modal-body">
            <form role="form">
              <div class="form-group">
                <label class="sr-only" for="newTitle">new title</label>
                <input type="text" class="form-control" id="newTitle" placeholder="what need to be done?">
                <div class="alert alert-danger alert-dismissible hidden" role="alert" id="alertTip">
                  <strong>Warning!!!</strong>title can not be empty
                </div>
              </div>    
            </form>
          </div>
          <div class="modal-footer">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <button type="button" class="btn btn-default btn-block" data-dismiss="modal">
                    取消
                  </button>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <button type="button" class="btn btn-primary btn-block" data-dismiss="alert" id="confirm">
                    确定
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    `
    return html
  }

  destroy () {
    console.log('NewTodos destroy')
    this._$container.find('#confirm').off('click')
    this._$container = null
    this._todosList = null
  }
}
