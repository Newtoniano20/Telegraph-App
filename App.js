import {React, useState, useEffect} from 'react';
import {View, Button} from 'react-native';

const YourApp = () => {
  const [isActive, setIsActive] = useState(false);
  
  let Pressed = false;
  const get_server = async () => {
    await console.log("Running get Server")
    await fetch(
      'https://telegraph-edw.herokuapp.com/receive'
    ).then((response) => response.json())
    .then((json) => {
      setIsActive(json["0"]);
    })
  }
  const send_data = (state) => {
    fetch('https://telegraph-edw.herokuapp.com/update',{
    method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify({
        "room": 0,
        "state": state
      })
  })
}

  useEffect(() => {
    const interval = setInterval(() => {
      get_server();
    }, 500)
    return () => clearInterval(interval)
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor: isActive ? 'salmon' : 'white', color: isActive ? 'white' : 'salmon',}}>
      <Button
      title="Send"
      onPress={ () => {
        console.log("Pressed")
        Pressed = !Pressed;
        setIsActive(Pressed)
        send_data(Pressed);
      } }
      />
    </View>
  );
}

export default YourApp;