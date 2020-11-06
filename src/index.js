import React,{useState, useEffect} from "react";
import {StyleSheet, FlatList, View, Button} from "react-native";
import ListItem from "./components/ListItem";
import Input from "./components/Input";
import Modal from "./components/Modal";
import {complete, saveTodo, editTodo, deleteTodo} from "./reducers/todos";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    list: {
        alignSelf: "stretch",
    },
})

const App = ({data, complete, submit, edit, delet}) => {
    const [value, setValue] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [todo, setTodo] = useState("");
    const [build, setBuild] = useState({});

    const handleChange = text => {
        console.log(text);
        setTodo(text);
    }

    const handleSubmit = () => {
        submit(todo);
        setTodo("");
    }

    const handleEdit = (id,desc,completed) => {
        const payload = {
            id: id,
            desc: desc,
            completed: completed,
        }
        setBuild(payload);
        setValue(desc);
        setVisibility(true);
    }

    const onEditing = newTodo => {
        const payload = {
            id: build.id,
            desc: newTodo,
            completed: build.completed,
        }
        setBuild(payload)
    } 

    const successEditing = () => {
        edit(build.id, build.desc, build.completed);
        setVisibility(false);
    }

    const onDelete = (id) => {
        delet(id);
    }

    return (
        <View style={styles.container}>
            <Input value={todo} onChange={handleChange} onSubmit={handleSubmit}/>
            <FlatList
                style={styles.list}
                data={data}
                keyExtractor={x => String(x.id)}
                renderItem={({item}) => 
                    <ListItem 
                        completed={item.completed} 
                        desc={item.desc}
                        onPress={() => complete(item.id)} 
                        onDelete={() => onDelete(item.id)}
                        onEdit={() => handleEdit(item.id,item.desc,item.completed)}/>
                }
            />
            <Modal visibility={visibility}>
                <View>
                    <Input
                        value={build.desc}
                        placeholder="¿Cuál es tu todo?"
                        onChangeText={onEditing}
                    />
                    <Button title="Guardar" onPress={successEditing}/>
                </View>
            </Modal>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.todos,
    }
}

const mapDispatchToProps = (dispatch) => ({
    complete: (id) => dispatch(complete(id)),
    submit: (text) => dispatch(saveTodo(text)),
    edit: (id,desc,completed) => dispatch(editTodo(id,desc,completed)),
    delet: (id) => dispatch(deleteTodo(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);