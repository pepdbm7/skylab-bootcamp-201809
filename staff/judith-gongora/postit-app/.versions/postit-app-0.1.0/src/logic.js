import { storage, Postit } from './data'


const logic = {
    createPostit(text) {
        const postit = new Postit(text)

        const postits = this.listPostits()

        postits.push(postit)

        this.persistPostits(postits)
    },

    listPostits() {
        return JSON.parse(storage.getItem('postits'))
    },

    persistPostits(postits) {
        storage.setItem('postits', JSON.stringify(postits))
    },

    deletePostit(id) {
        let postits = this.listPostits()

        postits = postits.filter(postit => postit.id !== id)

        this.persistPostits(postits)
    },

    editPost(id) {
        document.getElementById(id).disabled = false;
    },

    UpdatePostit(id, index, text) {
        let postits = this.listPostits()

        postits.splice(index, 1, {text : text ,id : id});

        this.persistPostits(postits)
    }


}
export default logic