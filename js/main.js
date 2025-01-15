const app = Vue.createApp({
    data(){
        return{
            intro:'Participants',
            participants: [],
            newParticipant:{
            name:'',
            age: null,
            country: '',
            },  
            
            

        }
    }, 
    methods: {
        addMethod(){
            const newParticipant = {
                name: this.newParticipant.name,
                age: this.newParticipant.age,
                country: this.newParticipant.country,
                
            };

            axios.post('http://localhost:5071/api/Participants', newParticipant)
            .then(Response=>{
                console.log('Participant added', Response.data);

            //Opdaterer tabellen
            this.getAll();
            //Ryd inputfelter    
            this.newParticipant = { name: '', age: '', country: '' };

                
            })
            .catch(error=>{
                console.log(error);
            })
        },
        getAll(){
            axios.get('http://localhost:5071/api/Participants')
            .then(Response=>{
                this.participants=Response.data;
            })
            .catch(
                error=>{
                    console.log(error)
                }
            )
        },
        deleteMethod(participantId) {
            axios.delete(`http://localhost:5071/api/Participants/${participantId}`)
                .then(() => {
                    // Fjern deltageren lokalt fra listen
                    this.participants = this.participants.filter(p => p.id !== participantId);
                    
                })
                .catch(error => {
                    console.error('Error deleting participant:', error);
                }
            );
        },
        sortByAge(order) {
            if (order === 'asc') {
                // Sorter stigende (lav til høj)
                this.participants.sort((a, b) => a.age - b.age);
            } else if (order === 'desc') {
                // Sorter faldende (høj til lav)
                this.participants.sort((a, b) => b.age - a.age);
            }
        },
        
                
    },
    computed:{
        myComputed(){
            return''
        },
    }


})