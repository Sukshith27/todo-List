import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Keyboard, CheckBox } from 'react-native';
import Note from './note';
import { styles } from './commonStyles'

export default class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
            count: 0,
            editing: false,
            currentEditIndex: '',
            inputRef: ''
        }
    }

    render() {

        let notes = this.state.noteArray.map((val, index) => {
            return <View style={styles.note} key={index}>
                <View style={{ flexDirection: 'row' }}>
                {
                    !val.complete &&
                        <CheckBox
                            value={this.state.checked}
                            onValueChange={() => {
                                this.markComplete(index);
                            }}
                        />
                }
                <Text style={styles.noteText}>{val.note}</Text>
                </View>
                {
                    !val.complete? 
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={() => this.editNote(index)} style={styles.noteEdit}>
                            <Text style={styles.noteEditText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.deleteNote(index)} style={styles.noteDelete}>
                            <Text style={styles.noteDeleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{flexDirection: 'row', marginLeft: 50}}> 
                    <Text style={{textAlign: 'right'}}>Completed!</Text>
                    </View>
                }
            </View>
        });

        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>todo List</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText) => this.setState({ noteText })}
                        value={this.state.noteText}
                        placeholder='Note text'
                        placeholderTextColor='rgba(25,255,255, 0.5)'
                        underlineColorAndroid='transparent'
                        ref={(input) => { this.secondTextInput = input; }}
                    />
                </View>
                {
                    this.state.editing ?
                        <TouchableOpacity onPress={this.editNoteComplete.bind(this)} style={styles.editButton}>
                            <Text style={styles.editButtonText}>✅</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                }
            </View>
        );
    }

    addNote() {
        // alert('j');
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({
                // 'date': d.getFullYear() +
                //     "/" + (d.getMonth() + 1) +
                //     "/" + d.getDate(),
                'note': this.state.noteText,
                "complete" : false
            });
            console.log(this.state.noteArray);
            this.setState({ noteArray: this.state.noteArray })
            this.setState({ noteText: '' });
            this.secondTextInput.blur();
        }
    }

    deleteNote = (key) => {
        console.log(this.state.noteArray.splice(key, 1));
        this.setState({ noteArray: this.state.noteArray })
    }

    markComplete = (index) => {
        let { noteArray, noteText} = this.state;
        currentEditIndex = index;
        let oldNoteArray = noteArray;
        let oldNoteText = noteArray[currentEditIndex]['note'];
        oldNoteArray[currentEditIndex] = {note: oldNoteText, complete: true}
        this.setState({noteArray: oldNoteArray});
    }

    editNote = (index) => {
        let { noteArray, noteText } = this.state;
        let oldNoteVal = noteArray[index].note;
        console.log(noteArray[index].note);
        this.setState({noteText:oldNoteVal, currentEditIndex: index, editing: true});
        this.secondTextInput.focus();
    }

    editNoteComplete = () => {
        let {currentEditIndex, noteArray, noteText} = this.state;
        let oldNoteArray = noteArray;

        oldNoteArray[currentEditIndex] = {note: noteText}

        this.setState({noteArray: oldNoteArray, editing:false, noteText: ''});
        this.secondTextInput.blur();
    }
}