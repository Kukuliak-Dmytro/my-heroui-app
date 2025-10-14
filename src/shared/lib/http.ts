import ky from 'ky'

//since we don't have auth, we can have one client being used both on the server and the client
//this will allow us to prefetch data on the server and use the same client on the client

export const http = ky.create({
    prefixUrl: 'https://dummyjson.com/recipes',
    timeout: 10000,
    retry: 2,
})