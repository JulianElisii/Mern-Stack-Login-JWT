import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSsessionStorage } from '../hooks/sessionstorage';
import M from 'materialize-css';

const Task = () => {

  const initialentry = {
    title: "",
    description: "",
    _id: ""
  }

  const [Tasks, setTasks] = useState([]);
  const [Imput, setImput] = useState(initialentry);

  const log = useSsessionStorage("auth-token")

  useEffect(() => {
    getTasks()
  }, []);

  const SendUser = () => {
    if (Imput._id) {
      axios.put(`http://localhost:4000/api/tasks/${Imput._id}`, Imput, {
        headers: { "auth-token": log }
      }).then(response => {
        const { data } = response
        console.log(data)
        //poner advertencia de tarea creada
        M.toast({ html: 'Task Updated' })
        setImput(initialentry)
        getTasks();
      })
    } else {
      axios.post("http://localhost:4000/api/tasks", Imput, {
        headers: { "auth-token": log }
      }).then(response => {
        const { data } = response
        console.log(data)
        //poner advertencia de tarea creada
        M.toast({ html: 'Task Posted' })
        setImput(initialentry)
        getTasks();
      })
    }
  }



  const getTasks = () => {
    axios.get("http://localhost:4000/api/tasks", {
      headers: { "auth-token": log }
    })
      .then(response => {
        const { data } = response
        console.log(data)
        setTasks(data)
      })
  }

  const DeleteTask = (id) => {
    if (window.confirm("Are you sure want to delete it?")) {
      axios.delete(`http://localhost:4000/api/tasks/${id}`, {
        headers: { "auth-token": log }
      }).then(response => {
        const { data } = response
        console.log(data)
        //poner una advertencia tarea borrada
        M.toast({ html: 'Task Deleted' })
        getTasks()
      });
    }
    else {
      M.toast({ html: 'Function not executed' })
    }
  }


  const getTaskById = (id) => {
    axios.get(`http://localhost:4000/api/tasks/${id}`, {
      headers: { "auth-token": log }
    }).then(response => {
      const { data } = response
      console.log(data)
      setImput({
        title: data.title,
        description: data.description,
        _id: data._id
      })
    })
  }

  const preventDefault = (e) => {
    e.preventDefault()
  }

  const handelInput = (e) => {
    const { name, value } = e.target;
    setImput({ ...Imput, [name]: value });
  };

  return (
    <div>
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">MERN Stack</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={preventDefault}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input onChange={handelInput} name="title" value={Imput.title} type="text" placeholder="Task Title" autoFocus />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea onChange={handelInput} name="description" value={Imput.description} cols="30" rows="10" placeholder="Task Description" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div>
                      {Imput._id
                        ? <button onClick={SendUser} className="btn light-blue darken-4"> update </button>
                        :
                        <button onClick={SendUser} className="btn light-blue darken-4"> Send </button>
                      }
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>
                            <button onClick={() => DeleteTask(task._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i>
                            </button>
                            <button onClick={() => getTaskById(task._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
