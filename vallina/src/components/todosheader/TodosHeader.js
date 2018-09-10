/**
 * todos头部
 */
export default class TodosHeader {
  constructor () {
    console.log('TodosHeader create')
  }

  init ($container) {
    if (!$container) {
      return
    }
    $container.html(this._getHtml())
  }

  _getHtml () {
    let html = `
      <div class="row">
        <div class="hidden-md hidden-lg col-sm-2 col-xs-2 left-arrow">
          <i class="glyphicon glyphicon-chevron-left"></i>
        </div>
        <div class="col-md-10 col-sm-8 col-xs-8">
          <h1 class="text-align-sm text-align-md text-align-lg">todos</h1>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 right-plus">
          <i class="glyphicon glyphicon-plus-sign text-right" id="newTodos" data-toggle="modal" data-target="#newTodosModal"></i>
        </div>
      </div>
    `
    return html
  }

  destroy () {
    console.log('TodosHeader destroy')
  }
}
