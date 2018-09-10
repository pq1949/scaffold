/**
 * 控制器类
 */
import 'bootstrap/dist/css/bootstrap.css'
import '../todosheader/css/TodosHeader.scss'
import '../todoslist/css/TodosList.scss'

import 'bootstrap/dist/js/bootstrap'
import TodosHeader from '../todosheader/TodosHeader'
import NewTodos from '../newtodos/NewTodos'
import TodosList from '../todoslist/TodosList'

export default class Controller {
  constructor () {
    console.log('Controller create')
    this._todosHeader = new TodosHeader()
    this._newTodos = new NewTodos()
    this._todosList = new TodosList()
  }

  init ($container) {
    $container.html(this._getHtml())
    this._todosHeader.init($container.find('#header'))
    this._newTodos.init($container.find('#newTodosDialog'))
    this._todosList.init($container.find('#mainContent'))
  }

  _getHtml () {
    let html = `
    <div class="container-fluid">
      <div class="row">
        <header class="bg-primary" id="header">
          
        </header>
        <div class="main-content" id="mainContent"></div>
      </div>
    </div>
    <div id="newTodosDialog">
    
    </div>
    `
    return html
  }

  destroy () {
    console.log('Controller destroy')
    this._todosHeader = null
    this._newTodos = null
    this._todosList = null
  }
}
