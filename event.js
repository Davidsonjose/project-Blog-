const Event= require ('events');
const event =new Event.EventEmitter();


//creating an event
event.on('hello world', function(message ){
    console.log(message);
});

//emmiting the event created
// event.emit('hello world', 'this is the new message from davidson jose')


exports.getReqData = (req)=> {
    return new Promise ((resolve, reject)=>{
        try {
            let body = '';
            //listen to the data sent by the client
            req.on('data', (chunck)=>{
                console.log(chunck);
                body +=  chunck.toString();
            });

            //listen to the end
            req.on('end', ()=>{
                resolve(body);  
            })
        } catch (error) {
            reject (error);
        }
    })
}
















// event.on('fetchData', function(url){
//     return axios.get(url).then((response)=>{
//         return response;
//     }).catch(error=> error.response)
// })

// //emmiting an event 
// event.emit('hello world', "this is davidson jose first event" );

// let a= event.emit('fetchData', 'http://jsonplaceholder.typicode.com/posts/')
// console.log(a);