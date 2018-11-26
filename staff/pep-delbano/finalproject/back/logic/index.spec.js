const mongoose = require('mongoose')
const { User } = require('../data/user/index')
const { Product } = require('../data/product/index')
const { Order } = require('../data/order')
const logic = require('.')
const { AlreadyExistsError, ValueError } = require('../errors')
// const fs = require('fs-extra')
const path = require('path')
// const hasha = require('hasha')  //para fotos
// const streamToArray = require('stream-to-array')  //para fotos
// const text2png = require('text2png')  //para fotos

const { expect } = require('chai')

const MONGO_URL = 'mongodb://localhost:27017/planbe-test'

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    before(() => mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }))

    beforeEach(() => Promise.all([User.deleteMany()]))

    describe('user', () => {
        describe('register', () => {
            let type, name, surname, username, password

            beforeEach(() => {
                type = 'Corporate'
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', async () => {
                const res = await logic.registerUser(type, name, surname, username, password)

                expect(res).to.be.undefined

                const users = await User.find()

                expect(users.length).to.equal(1)

                const [user] = users

                expect(user.type).to.equal('Corporate')
                expect(user.id).to.be.a('string')
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)
            })

            it('should fail on undefined type', () => {
                expect(() => logic.registerUser(undefined, name, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty type', () => {
                expect(() => logic.registerUser('', name, surname, username, password)).to.throw(ValueError, 'type is empty or blank')
            })

            it('should fail on blank type', () => {
                expect(() => logic.registerUser('   \t\n', name, surname, username, password)).to.throw(ValueError, 'type is empty or blank')
            })



            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(type, undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty name', () => {
                expect(() => logic.registerUser(type, '', surname, username, password)).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on blank name', () => {
                expect(() => logic.registerUser(type, '   \t\n', surname, username, password)).to.throw(ValueError, 'name is empty or blank')
            })
            

            
            it('should fail on undefined surname', () => {
                expect(() => logic.registerUser(type, name, undefined, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty surname', () => {
                expect(() => logic.registerUser(type, name, '', username, password)).to.throw(ValueError, 'surname is empty or blank')
            })

            it('should fail on blank surname', () => {
                expect(() => logic.registerUser(type, name, '   \t\n', username, password)).to.throw(ValueError, 'surname is empty or blank')
            })



            it('should fail on undefined username', () => {
                expect(() => logic.registerUser(type, name, surname, undefined, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty username', () => {
                expect(() => logic.registerUser(type, name, surname, '', password)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on blank username', () => {
                expect(() => logic.registerUser(type, name, surname, '   \t\n', password)).to.throw(ValueError, 'username is empty or blank')
            })



            it('should fail on undefined password', () => {
                expect(() => logic.registerUser(type, name, surname, username, undefined)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty password', () => {
                expect(() => logic.registerUser(type, name, surname, username, '')).to.throw(ValueError, 'password is empty or blank')
            })

            it('should fail on blank password', () => {
                expect(() => logic.registerUser(type, name, surname, username, '   \t\n')).to.throw(ValueError, 'password is empty or blank')
            })
    
        })

        describe('authenticate', () => {
            let user


            beforeEach(() => (user = new User({ type: 'Individual', name: 'John', surname: 'Doe', username: 'jd', password: '123' })).save())


            it('should authenticate on correct credentials', async () => {
                const { username, password } = user

                const id = await logic.authenticateUser(username, password)

                expect(id).to.exist
                expect(id).to.be.a('string')

                const users = await User.find()

                const [_user] = users

                expect(_user.id).to.equal(id)
            })


            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty username', () => {
                expect(() => logic.authenticateUser('', user.password)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on blank username', () => {
                expect(() => logic.authenticateUser('   \t\n', user.password)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on undefined password', () => {
                expect(() => logic.authenticateUser(user.name, undefined)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty password', () => {
                expect(() => logic.authenticateUser(user.name, '')).to.throw(ValueError, 'password is empty or blank')
            })

            it('should fail on blank password', () => {
                expect(() => logic.authenticateUser(user.name, '   \t\n')).to.throw(ValueError, 'password is empty or blank')
            })

            // TODO other test cases
        })

        describe('retrieve', () => {
            let user

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                await user.save()
            })

            it('should succeed on valid id', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user).not.to.be.instanceof(User)

                const { id, name, surname, username, password, postits } = _user

                expect(id).to.exist
                expect(id).to.be.a('string')
                expect(id).to.equal(user.id)
                expect(name).to.equal(user.name)
                expect(surname).to.equal(user.surname)
                expect(username).to.equal(user.username)
                expect(password).to.be.undefined
                expect(postits).not.to.exist
            })
        })

        describe('update', () => {
            let user

            beforeEach(() => (user = new User({ type: 'Individual', name: 'John', surname: 'Doe', username: 'jd', password: '123' })).save())

            it('should update on correct data and password', async () => {
                const { id, type, name, surname, username, password } = user

                const newType = 'Corporate'
                const newName = `${name}-${Math.random()}`
                const newSurname = `${surname}-${Math.random()}`
                const newUsername = `${username}-${Math.random()}`
                const newPassword = `${password}-${Math.random()}`

                const res = await logic.updateUser(id, newType, newName, newSurname, newUsername, newPassword, password)

                expect(res).to.be.undefined

                const _users = await User.find()  //the user just created

                const [_user] = _users //destructuring of the array of users

                expect(_user.id).to.equal(id)

                expect(_user.type).to.equal(newType)
                expect(_user.name).to.equal(newName)
                expect(_user.surname).to.equal(newSurname)
                expect(_user.username).to.equal(newUsername)
                expect(_user.password).to.equal(newPassword)
            })

            it('should update on correct id, type, name and password (other fields null)', async () => {
                const { id, type, name, surname, username, password } = user

                const newName = `${name}-${Math.random()}`

                const res = await logic.updateUser(id, type, newName, null, null, null, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)
                expect(_user.type).to.equal(type)
                expect(_user.name).to.equal(newName)
                expect(_user.surname).to.equal(surname)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)
            })

            it('should update on correct id, surname and password (other fields null)', async () => {
                const { id, type, name, surname, username, password } = user

                const newSurname = `${surname}-${Math.random()}`

                const res = await logic.updateUser(id, null, null, newSurname, null, null, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)
                expect(_user.type).to.equal(type)
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(newSurname)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)
            })

            // TODO other combinations of valid updates

            it('should fail on undefined id', () => {
                const { id, type, name, surname, username, password } = user

                expect(() => logic.updateUser(undefined, type, name, surname, username, password, password)).to.throw(TypeError, 'undefined is not a string')
            })

            

            // TODO other test cases!!!





            describe('with existing user', () => {
                let user2

                beforeEach(async () => {
                    user2 = new User({ type: 'Individual', name: 'John', surname: 'Doe', username: 'jd2', password: '123' })

                    await user2.save()
                })

                it('should update on correct data and password', async () => {
                    const { id, type, name, surname, username, password } = user2

                    const newUsername = 'jd'

                    try {
                        const res = await logic.updateUser(id, null, null, null, newUsername, null, password)

                        expect(true).to.be.false
                    } catch (err) {
                        expect(err).to.be.instanceof(AlreadyExistsError)
                    } finally {
                        const _user = await User.findById(id)

                        expect(_user.id).to.equal(id)
                        expect(_user.type).to.equal(type)
                        expect(_user.name).to.equal(name)
                        expect(_user.surname).to.equal(surname)
                        expect(_user.username).to.equal(username)
                        expect(_user.password).to.equal(password)
                    }
                })
            })
        })

        // describe('add collaborator', () => {
        //     let user, user2

        //     beforeEach(() => (user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })).save()
        //         .then(() => (user2 = new User({ name: 'Pepe', surname: 'Grillo', username: 'pg', password: '123' })).save()))

        //     it('should update on correct data and password', async () => {
        //         const res = await logic.addCollaborator(user.id, user2.username)

        //         expect(res).to.be.undefined

        //         const _user = await User.findById(user.id)

        //         expect(_user.id).to.equal(user.id)

        //         expect(_user.collaborators.length).to.equal(1)

        //         const [collaboratorId] = _user.collaborators

        //         expect(collaboratorId.toString()).to.equal(user2.id)
        //     })
        // })

    //     describe('list collaborators', () => {
    //         let user, user2

    //         beforeEach(() => (user2 = new User({ name: 'Pepe', surname: 'Grillo', username: 'pg', password: '123' })).save()
    //             .then(() => (user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', collaborators: [user2.id] })).save()))

    //         it('should update on correct data and password', async () => {
    //             const collaborators = await logic.listCollaborators(user.id)

    //             expect(collaborators.length).to.equal(1)

    //             const [collaborator] = collaborators

    //             const { _id, id, username, name, surname, password } = collaborator

    //             expect(_id).to.be.undefined
    //             expect(id).to.equal(user2.id)
    //             expect(username).to.equal(user2.username)
    //             expect(name).to.be.undefined
    //             expect(surname).to.be.undefined
    //             expect(password).to.be.undefined
    //         })
    //     })

    //     describe('save photo', () => {
    //         let user

    //         beforeEach(() => (user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })).save())

    //         it('should succeed on correct data', async () => {
    //             const filename = 'profile.png'

    //             const rs = fs.createReadStream(path.join(process.cwd(), `data/users/default/${filename}`))

    //             await logic.saveUserPhoto(user.id, rs, filename)

    //             expect(fs.existsSync(path.join(process.cwd(), `data/users/${user.id}/${filename}`))).to.be.true
    //         })

    //         afterEach(() => fs.removeSync(`data/users/${user.id}`))
    //     })

    //     describe('retrieve photo', () => {
    //         let user

    //         beforeEach(() => (user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })).save())

    //         it('should succeed on correct data', async () => {
    //             const userPhotoReadStream = await logic.retrieveUserPhoto(user.id)

    //             const userPhotoHashReadStream = userPhotoReadStream.pipe(hasha.stream())

    //             const defaultPhotoHashReadStream = fs.createReadStream('data/users/default/profile.png').pipe(hasha.stream())

    //             const hashes = await Promise.all([
    //                 streamToArray(userPhotoHashReadStream)
    //                     .then(arr => arr[0]),
    //                 streamToArray(defaultPhotoHashReadStream)
    //                     .then(arr => arr[0])
    //             ])

    //             const [userPhotoHash, defaultPhotoHash] = hashes

    //             expect(userPhotoHash).to.equal(defaultPhotoHash)
    //         })

    //         describe('when user already has a profile photo', () => {
    //             let folder, file

    //             beforeEach(() => {
    //                 folder = `data/users/${user.id}`

    //                 fs.mkdirSync(folder)

    //                 file = 'photo.png'

    //                 fs.writeFileSync(path.join(folder, file), text2png(':-)', { color: 'blue' }))
    //             })

    //             it('should succeed on correct data', async () => {
    //                 const userPhotoReadStream = await logic.retrieveUserPhoto(user.id)
    
    //                 const userPhotoHashReadStream = userPhotoReadStream.pipe(hasha.stream())
    
    //                 const actualPhotoHashReadStream = fs.createReadStream(path.join(folder, file)).pipe(hasha.stream())
    
    //                 const hashes = await Promise.all([
    //                     streamToArray(userPhotoHashReadStream)
    //                         .then(arr => arr[0]),
    //                     streamToArray(actualPhotoHashReadStream)
    //                         .then(arr => arr[0])
    //                 ])
    
    //                 const [userPhotoHash, actualPhotoHash] = hashes
    
    //                 debugger

    //                 expect(userPhotoHash).to.equal(actualPhotoHash)
    //             })
    //         })

    //         afterEach(() => fs.removeSync(`data/users/${user.id}`))
    //     })
    })


    // describe('postits', () => {
    //     describe('add', () => {
    //         let user, text

    //         beforeEach(async () => {
    //             user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

    //             text = `text-${Math.random()}`

    //             await user.save()
    //         })

    //         it('should succeed on correct data', async () => {
    //             const res = await logic.addPostit(user.id, text)

    //             expect(res).to.be.undefined

    //             const postits = await Postit.find()

    //             const [postit] = postits

    //             expect(postit.text).to.equal(text)

    //             expect(postit.user.toString()).to.equal(user.id)
    //         })

    //         // TODO other test cases
    //     })

    //     describe('list', () => {
    //         let user, postit, postit2

    //         beforeEach(async () => {
    //             user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

    //             postit = new Postit({ text: 'hello text', user: user.id })
    //             postit2 = new Postit({ text: 'hello text 2', user: user.id })

    //             await user.save()
    //             await postit.save()
    //             await postit2.save()
    //         })

    //         it('should succeed on correct data', async () => {
    //             const postits = await logic.listPostits(user.id)

    //             const _postits = await Postit.find()

    //             expect(_postits.length).to.equal(2)

    //             expect(postits.length).to.equal(_postits.length)

    //             const [_postit, _postit2] = _postits

    //             expect(_postit.id).to.equal(postit.id)
    //             expect(_postit.text).to.equal(postit.text)

    //             expect(_postit2.id).to.equal(postit2.id)
    //             expect(_postit2.text).to.equal(postit2.text)

    //             const [__postit, __postit2] = postits

    //             expect(__postit).not.to.be.instanceof(Postit)
    //             expect(__postit2).not.to.be.instanceof(Postit)

    //             expect(_postit.id).to.equal(__postit.id)
    //             expect(_postit.text).to.equal(__postit.text)

    //             expect(_postit2.id).to.equal(__postit2.id)
    //             expect(_postit2.text).to.equal(__postit2.text)
    //         })

    //         describe('when user has postit assigned', () => {
    //             let user2, postit3

    //             beforeEach(async () => {
    //                 user2 = new User({ name: 'Pepe', surname: 'Grillo', username: 'pg', password: '123' })

    //                 postit3 = new Postit({ text: 'hello text 3', user: user2.id, assignedTo: user.id })

    //                 await user2.save()
    //                 await postit3.save()
    //             })

    //             it('should succeed on correct data', async () => {
    //                 const postits = await logic.listPostits(user.id)

    //                 expect(postits.length).to.equal(3)

    //                 postits.forEach(_postit => {
    //                     if (_postit.id === postit.id) {
    //                         expect(_postit.text).to.equal(postit.text)
    //                     } else if (_postit.id === postit2.id) {
    //                         expect(_postit.text).to.equal(postit2.text)
    //                     } else if (_postit.id === postit3.id) {
    //                         expect(_postit.text).to.equal(postit3.text)

    //                         expect(_postit.assignedTo).to.equal(user.id)
    //                     } else {
    //                         throw Error('postit does not match any of the expected ones')
    //                     }
    //                 })
    //             })
    //         })
    //     })

    //     describe('remove', () => {
    //         let user, postit

    //         beforeEach(async () => {
    //             user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
    //             postit = new Postit({ text: 'hello text', user: user.id })

    //             await Promise.all([user.save(), postit.save()])
    //         })

    //         it('should succeed on correct data', async () => {
    //             const res = await logic.removePostit(user.id, postit.id)

    //             expect(res).to.be.undefined

    //             const postits = await Postit.find()

    //             expect(postits.length).to.equal(0)
    //         })
    //     })

    //     describe('modify', () => {
    //         let user, postit, newText

    //         beforeEach(async () => {
    //             user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
    //             postit = new Postit({ text: 'hello text', user: user.id })

    //             newText = `new-text-${Math.random()}`

    //             await Promise.all([user.save(), postit.save()])
    //         })

    //         it('should succeed on correct data', async () => {
    //             const res = await logic.modifyPostit(user.id, postit.id, newText)

    //             expect(res).to.be.undefined

    //             const postits = await Postit.find()

    //             expect(postits.length).to.equal(1)

    //             const [_postit] = postits

    //             expect(_postit.text).to.equal(newText)
    //         })
    //     })

    //     describe('move', () => {
    //         let user, postit, newStatus

    //         beforeEach(async () => {
    //             user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
    //             postit = new Postit({ text: 'hello text', user: user.id })

    //             newStatus = 'DOING'

    //             await Promise.all([user.save(), postit.save()])
    //         })

    //         it('should succeed on correct data', async () => {
    //             const res = await logic.movePostit(user.id, postit.id, newStatus)

    //             expect(res).to.be.undefined

    //             const postits = await Postit.find()

    //             expect(postits.length).to.equal(1)

    //             const [_postit] = postits

    //             expect(_postit.status).to.equal(newStatus)
    //         })
    //     })

    //     describe('assign', () => {
    //         let user, postit, user2

    //         beforeEach(async () => {
    //             user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
    //             postit = new Postit({ text: 'hello text', user: user.id })
    //             user2 = new User({ name: 'Pepito', surname: 'Grillo', username: 'pg', password: '123' })

    //             await Promise.all([user.save(), postit.save(), user2.save()])
    //         })

    //         it('should succeed on correct data', async () => {
    //             const res = await logic.assignPostit(user.id, postit.id, user2.id)

    //             expect(res).to.be.undefined

    //             const postits = await Postit.find()

    //             expect(postits.length).to.equal(1)

    //             const [_postit] = postits

    //             expect(_postit.id).to.equal(postit.id)
    //             expect(_postit.user.toString()).to.equal(user.id)
    //             expect(_postit.text).to.equal(postit.text)
    //             expect(_postit.assignedTo.toString()).to.equal(user2.id)
    //         })
    //     })
    // })

    afterEach(() => Promise.all([User.deleteMany()]))

    after(() => mongoose.disconnect())
})