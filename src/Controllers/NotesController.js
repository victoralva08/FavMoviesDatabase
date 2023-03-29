 const knex = require('../database/knex/index')

 class NotesController{

    async createNote(request, response){
        
        const { movie_name, movie_description, movie_rate, tags } = request.body
        const { user_id } = request.params

        const [note_id] = await knex('movie_notes').insert({
            movie_name,
            movie_description,
            movie_rate,
            user_id
        })

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        })

        await knex('movie_tags').insert(tagsInsert)
        
        response.json('New movie note registered.')

    }

    async showNote(request, response){

        const { id } = request.params // this id reference the note_id.

        const note = await knex('movie_notes').where({ id }).first()
        const tags = await knex('movie_tags').where({ note_id: id }).orderBy('name')

        return response.status(200).json({
            ...note,
            tags
        })

    }

    async deleteNote(request, response){
        
        const { id } = request.params

        await knex('movie_notes').where({ id }).delete()
        return response.status(200).json(`Note with id: ${id} deleted.`)
    }

    async listNotes(request, response){

        const { user_id, movie_name, tags } = request.query
        let notes

        if(tags){ // if the user informs the note tags
            const filterTags = tags.split(',').map(tag => tag.trim())

            notes = await knex("movie_tags")
            .select([
                'movie_notes.user_id',
                'movie_notes.id',
                'movie_notes.movie_name',
                'movie_notes.movie_description'
            ])
            .where('movie_notes.user_id', user_id)
            .whereLike('movie_notes.movie_name', `${movie_name}`)
            .whereIn('name', filterTags)
            .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
            .orderBy('movie_notes.movie_name')
        
        } else if (!movie_name) {

            notes = await knex('movie_notes')
            .where({user_id})
            .orderBy('id')
        
        } else {
            notes = await knex('movie_notes')
            .where({user_id})
            .whereLike('movie_name', `%${movie_name}%`)
            .orderBy('id')
        }

        return response.json(notes)
    }
}

module.exports = NotesController