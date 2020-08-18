import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {Link, hashHistory} from 'react-router'
import query from '../queries/fetchSongs'
class SongCreate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
   
    onChange (event){
        console.log(event.target.value)
        this.setState({title:event.target.value})
    }
   
    onSubmit (event){
        event.preventDefault()
        console.log(this.props)
        this.props.mutate(
            {variables:{title:this.state.title},
            refetchQueries:[{query}]
        })
            .then(() => hashHistory.push('/'))
    }

    render(){
        return(
            <div>
               <Link to="/">Back</Link>
                <h1>Create Song</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label >Create a song</label>
                    <input value={this.state.title} onChange={this.onChange}/>
                </form>
           </div>
        )
    }

}

const mutation = gql`

    mutation AddSong($title:String){
        addSong(title:$title){
            id
            title
        }
    }
`

export default graphql(mutation)(SongCreate)