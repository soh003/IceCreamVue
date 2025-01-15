const app = Vue.createApp({
    data(){
        return{
            intro:'IceCream ',
            iceCreams: [],
            newIceCream:{
            name:'',
            price: null,
            howMany:null,
            },  
            
            

        }
    }, 
    methods: {
        addMethod(){
            const newIceCream = {
                name: this.newIceCream.name,
                price: this.newIceCream.price,
                howMany: this.newIceCream.howMany,
                
            };

            axios.post('https://icecreamrest.azurewebsites.net/api/Icecreams', newIceCream)
            .then(Response=>{
                console.log('IceCream added', Response.data);

            //Opdaterer tabellen
            this.getAll();
            //Ryd inputfelter    
            this.newIceCream = { name: '', price: '', howMany: '' };

                
            })
            .catch(error=>{
                console.log(error);
            })
        },
        getAll(){
            axios.get('https://icecreamrest.azurewebsites.net/api/Icecreams')
            .then(Response=>{
                this.iceCreams=Response.data;
            })
            .catch(
                error=>{
                    console.log(error)
                }
            )
        },
        deleteMethod(IceCreamId) {
            axios.delete(`https://icecreamrest.azurewebsites.net/api/Icecreams/${IceCreamId}`)
                .then(() => {
                    // Fjern is lokalt fra listen
                    this.iceCreams = this.iceCreams.filter(x => x.id !== IceCreamId);
                    
                })
                .catch(error => {
                    console.error('Error deleting IceCream:', error);
                }
            );
        },
        sortByPrice(order) {
            if (order === 'asc') {
                // Sorter stigende (lav til høj)
                this.iceCreams.sort((a, b) => a.price - b.price);
            } else if (order === 'desc') {
                // Sorter faldende (høj til lav)
                this.iceCreams.sort((a, b) => b.price - a.price);
            }
        },
        
                
    },
    computed:{
        myComputed(){
            return''
        },
    }


})