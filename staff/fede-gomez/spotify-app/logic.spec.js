

describe('logic', () => {
    describe('search artists', () => {
        it('should succeed on matching query', () => {
            var query = 'jackson'

            return logic.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()

                    expect(artists.length).toBeGreaterThan(0)
                })
        })
    })

    describe('list albums', () => {
        false && it('should succeed on matching query', () => {
            var id = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return logic.listAlbums(id)
                .then(albums => {
                    expect(albums).toBeDefined()
                    expect(albums.length).toBeGreaterThan(0)
                })
        })
    })

    describe('search songs', () => {
        it('should succeed on matching query', () => {
            var query = 'jackson'

            return logic.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()
                    expect(artists.length).toBeGreaterThan(0)
                })
        })
    })
})