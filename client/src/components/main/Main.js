import React, { Component } from "react";
import {
    Button,
    Grid,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notearea: "",
            notedata: null,
            updateId: null
        }
    }
    componentDidMount() {
        this.noteDataFetch();
    }
    noteDataFetch = () => {
        fetch('/task/get', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((notedata) => {
                this.setState({ notedata })
            }).catch((err) => console.log(err));
    }
    addTask = async (e) => {
        e.preventDefault();
        if (this.state.updateId) {
            await fetch('/task/upd', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    updateId: this.state.updateId,
                    notearea: this.state.notearea
                })
            }).then((res) => res.json())
                .then(() => {
                    this.setState({ notearea: '',updateId:null });
                })
                .catch((err) => console.log(err));
        } else {
            await fetch('/task/add', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    notearea: this.state.notearea
                })
            }).then((res) => res.json())
                .then(() => {
                    this.setState({ notearea: '' });
                })
                .catch((err) => console.log(err));
        }
        this.noteDataFetch();
    }
    deleteTask = async (_id) => {
        await fetch('/task/del', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deleteId: _id
            })
        }).then((res) => res.json());
        this.noteDataFetch();
    }
    updateTask = (_id, value) => {
        this.setState({ notearea: value, updateId: _id });
    }
    render() {
        return (
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <form onSubmit={this.addTask}>
                        <TextField id="outlined-basic" value={this.state.notearea} onChange={(notearea) => this.setState({ notearea: notearea.target.value })} name="taskname" label="Task" variant="outlined" />
                        <br /><br />
                        <Button onClick={this.addTask} variant="contained" color="primary">Submit</Button>
                    </form>
                    <TableContainer >
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Task</TableCell>
                                    <TableCell align="right">Update</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {

                                    this.state.notedata ?
                                        this.state.notedata.map(n =>
                                            <TableRow key={n._id}>
                                                <TableCell align="right">{n.taskText}</TableCell>
                                                <TableCell align="right">
                                                    <Button variant="contained" color="default" onClick={() => this.updateTask(n._id, n.taskText)}>Update</Button>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button variant="contained" color="secondary" onClick={() => this.deleteTask(n._id)}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ) : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </div >
        );
    }
}