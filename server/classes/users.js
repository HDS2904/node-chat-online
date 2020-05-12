

class Users {
    
    constructor() {
        this.personas = []
    }

    insertPerson( id, name, room){
        let persona = { id, name, room}
        this.personas.push(persona)
        return this.personas
    }

    getPerson( id ) {
        let persona = this.personas.filter( per => per.id === id )[0]
        return persona
    }

    getPeople() {
        return this.personas
    }

    getPeopleRoom( room ) {
        return this.personas.filter( person => person.room === room )
    }

    deletePerson( id ) {
        let personDelet = this.getPerson( id )
        this.personas = this.personas.filter( per => per.id != id)
        return personDelet
    }
}


module.exports = {
    Users
}