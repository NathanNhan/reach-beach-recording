import React, { Component } from 'react';
import items from './data';
import Client from './Contentful';

const RoomContext = React.createContext();
// <RoomContext.Provider value={'hello'}
export default class RoomProvider extends Component {
    state = {
       rooms:[],
       sortedRooms:[],
       featuredRooms:[],
       loading: true,
       book:[],
       type:'all',
       capacity:1,
       price:0,
       minPrice:0,
       maxPrice:0,
       minSize:0,
       maxSize:0,
       breakfast:false,
       pets:false,
    }
    //getData
    getData = async () => {
        try {
          let response = await Client.getEntries({
            content_type: "beachResort",
          });
          //this.getdata
          let rooms = this.formatData(response.items);
          console.log(rooms);
          let featuredRooms = rooms.filter((room) => room.featured === true);
          let maxPrice = Math.max(...rooms.map((item) => item.price));
          let maxSize = Math.max(...rooms.map((item) => item.size));
          this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize,
          });
        } catch (error) {
            console.log(error);
        }
    }
    componentDidMount() {
        this.getData();
    }

    formatData (items) {
        let tempItems = items.map(item=> {
            let id = item.sys.id;
            let images = item.fields.images.map(image=> image.fields.file.url);
            let room = {...item.fields, images, id}
            return room;
        });
        return tempItems;

    }
    //get booking

    //getRoom
    getRoom = (slug) => {
        let tempRoom = [...this.state.rooms];
        let room = tempRoom.find((room) => room.slug === slug);
        return room;
    }
    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = e.target.name;
        this.setState({
            [name] : value
        },this.filterRooms)
        //console.log(type,name,value);
    }
    filterRooms = () => {
        let {rooms , type, capacity,price, minSize, maxSize, breakfast,pets} = this.state;
        let tempRooms = [...rooms];
         capacity = parseInt(capacity);
        //filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        //filter by guest
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity === capacity)
        }
        //filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);
        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);
        //filter by breafast
        if(breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
        //filter by pet
        if(pets) {
            tempRooms = tempRooms.filter((room) => room.pets === true);
        }
        this.setState({
            sortedRooms: tempRooms
        })
    }
    render() {
        return (
            <RoomContext.Provider value={{ ...this.state , getRoom:this.getRoom, handleChange:this.handleChange, getBooking:this.getBooking}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export {RoomProvider, RoomConsumer, RoomContext};
