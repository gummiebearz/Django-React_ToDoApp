import React, { Component } from 'react';
import Modal from './components/Modal';
import axios from 'axios';

const todoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewCompleted: false,
      // todoList: todoItems,
      // Change to dynamic todoList
      todoList: [],

      // MODAL
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      }
    };
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/todos")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  // Modal toggling
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // Modal handle submit
  handleSubmit = (item) => {
    // Close the modal once user clicks save
    this.toggle();

    // Replace this with actual axios call
    // alert("save " + JSON.stringify(item));

    // EDIT EXISTING ITEM with PUT request
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then(() => this.refreshList());

      return;
    };

    // SUBMIT NEW ITEM with POST request
    axios.
      post("/api/todos/", item)
      .then(() => this.refreshList());
  };

  // Handle delete
  handleDelete = (item) => {
    // Replace this with actual axios call
    // alert("delete " + JSON.stringify(item));
    axios
      .delete(`/api/todos/${item.id}`)
      .then(() => this.refreshList());
  };

  // Create new item
  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  }

  // Edit an item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  }

  displayCompleted = (status) => {
    if (status) return this.setState({ viewCompleted: true });
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter((item) => item.completed == viewCompleted);

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };


  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }

};

export default App;
