import React from 'react';
import { View, StyleSheet, Text,TouchableOpacity, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useState,useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUpAZ} from '@fortawesome/free-solid-svg-icons';
import * as Progress from 'react-native-progress';
import { useTVEventHandler,TVEventHandler } from 'react-native-tvos';

import reactNativeTvosController from "react-native-tvos-controller"



function TableComponent() {
    const [data, setData] = useState([
        { Id: '1', Name: 'John',Progress:'20',Date:'2-01-2023',priority:'Low',Task:'Alpha' },
        { Id: '2', Name: 'Sandy',Progress:'50',Date:'6-01-2023',priority:'Low',Task:'Beta' },
        { Id: '3', Name: 'Bob',Progress:'60',Date:'25-01-2023',priority:'High',Task:'Gamma' },
        { Id: '4', Name: 'Stony',Progress:'10',Date:'2-02-2023',priority:'Medium',Task:'Tester' },
        { Id: '5', Name: 'Stark',Progress:'40',Date:'7-02-2023',priority:'High',Task:'Gun' },
        { Id: '6', Name: 'Dhoni',Progress:'10',Date:'16-02-2023',priority:'Low',Task:'Hunting' },
        { Id: '7', Name: 'Willams',Progress:'10',Date:'18-03-2023',priority:'Medium',Task:'Running' },
        { Id: '8', Name: 'Rocky',Progress:'10',Date:'20-03-2023',priority:'Medium',Task:'Footbal' },
        { Id: '9', Name: 'Stepen',Progress:'10',Date:'6-04-2023',priority:'High',Task:'Cricket' },
        { Id: '10', Name: 'bejoy',Progress:'10',Date:'2-05-2023',priority:'Low',Task:'Rider' },
      ]);
    //   const [value, setValue] = useState(null);

    //   const sort = [
    //     { label: 'Ascending', value: 'Ascending' },
    //     { label: 'Decending', value: 'Decending' },
       
    //   ];

    const[data1,setData1]=useState([])
    const [sortAscending, setSortAscending] = useState(true);
    console.log(data1,'data')

  const toggleSort = (column)=> {
    console.log(column,'t')
    setSortAscending(!sortAscending);
    const sortedData = [...data].sort((a, b) => {
      if (sortAscending) {
        
        return a[column].localeCompare(b[column]);
      } else {
        return b[column].localeCompare(a[column]);
      }
    });
    setData(sortedData)
  };

   
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  },[]);

  const fetchData = async () => {
    try {
      // Perform the data fetching here
      const response = await fetch('http://192.168.2.56:3003/getalltasks');
      const jsonData = await response.json();
      setData1(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleSort1 = (column) => {
    setSortAscending(!sortAscending);
  
    const sortedData = [...data1].sort((a, b) => {
      if (sortAscending) {
        if (column === 'Date') {
          const dateA = new Date(a[column].split('-').reverse().join('-'));
          const dateB = new Date(b[column].split('-').reverse().join('-'));
          return dateA - dateB;
        } else {
          return a[column].localeCompare(b[column]);
        }
      } else {
        if (column === 'Date') {
          const dateA = new Date(a[column].split('-').reverse().join('-'));
          const dateB = new Date(b[column].split('-').reverse().join('-'));
          return dateB - dateA;
        } else {
          return b[column].localeCompare(a[column]);
        }
      }
    });
  
    setData1(sortedData);
  };

  const keysArray = data1.map(obj => Object.keys(obj));
// setDataKeys(keysArray[0]);
console.log(keysArray[0],'daatkeys')
const datakeys=keysArray[0];
console.log(datakeys,'daatta')
const valuesArray=data1.map(obj=>Object.values(obj))
console.log(valuesArray,'array')

// const keysArray1 = data.map(obj => Object.keys(obj));
// // setDataKeys(keysArray[0]);
// console.log(keysArray1[0],'daatkeys1')
// const datakeys1=keysArray1[0];
// console.log(datakeys1,'daatta')
// const valuesArray1=data.map(obj=>Object.values(obj))
// console.log(valuesArray1,'array')

//  Handle TV remote control events
  const handleTVRemoteControlEvent = (event) => {
    console.log('controlled',event)
    if (event && event.eventType === 'right') {
      // Move selection to the right
      setSelectedColumnIndex((prevIndex) => (prevIndex + 1) % data.length);
    } else if (event && event.eventType === 'left') {
      // Move selection to the left
      setSelectedColumnIndex((prevIndex) =>
        prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
    } else if (event && event.eventType === 'select') {
      // Perform column reordering action (e.g., move selected column)
      // Update the data state with the new column order
      // Re-render the table with the updated column order
      const updatedData = [...data];
  const selectedColumn = updatedData[selectedColumnIndex];
  const nextColumnIndex = (selectedColumnIndex + 1) % data.length;
  updatedData[selectedColumnIndex] = updatedData[nextColumnIndex];
  updatedData[nextColumnIndex] = selectedColumn;

  // Update the data state with the new column order
  setData(updatedData);
      // ...
    }
  };

  

  // Set up TV remote control event handler
  useTVEventHandler(handleTVRemoteControlEvent);
  console.log(useTVEventHandler(handleTVRemoteControlEvent),'remotecontrol')

  
  
  return (
    <View style={styles.container}>
       <View style={{width:120,height:50,backgroundColor:'#04aa6d',marginBottom:10,borderRadius:7}}>
                <TouchableOpacity style={{color:'blue',marginTop:14}}
                //  onPress={handleTVRemoteControlEvent('right')}
                activeOpacity={0.7}
                 >
                    <Text style={{color:'black',textAlign:'center'}}>drag and drop</Text>
                </TouchableOpacity>
            </View>



            <ScrollView>
  <View style={styles.table1}>
    <View style={styles.row1}>
      {
        datakeys.map(key=>(
          <View style={styles.headerCell} >
            <TouchableOpacity onPress={()=>handleTVRemoteControlEvent(key)}>
              <Text style={{ flexDirection: 'row' }}>{key}</Text>
              </TouchableOpacity>

{/* <TouchableOpacity onPress={() => toggleSort1(key)}> */}
<TouchableOpacity style={{marginLeft:28}} onPress={()=>toggleSort1(key)} >
              <FontAwesomeIcon icon={faArrowUpAZ} color='#0B3E5D' size={15} />
            </TouchableOpacity>
        
      
            </View>

        ))
      }
      </View>
      {
       
        valuesArray.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((item, columnIndex) => (
              
              <View style={[styles.cell,{backgroundColor:rowIndex%2 ===0? "white":"#E7FAF8"}]} key={columnIndex}>
                 {columnIndex === 2 ? (
            <View style={{ marginTop: 5 }}>
              <Progress.Bar
                progress={parseFloat(item/100)}
                width={100}
                borderWidth={0.5}
                indeterminate={false}
                color="blue"
                borderRadius={2}
                borderColor="black"
              />
            </View>
          ) : (
            <Text style={styles.cellText}>{item}</Text>
          )}
                
              
       
        
              </View>
            ))}
          </View>
        ))
      }
    
    </View>
    </ScrollView>

  </View>
  )
}

export default TableComponent


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:18
      },
      header: {
        padding: 10,
        alignItems: 'flex-end',
      },
      sortButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
      },
      sortButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      table: {
        borderWidth: 1,
        borderColor: 'black',
        // marginBottom: 10,
        marginTop:-5
      },
      table1: {
        borderWidth: 1,
        borderColor: 'black',
        // marginBottom: 10,
        marginTop:-5
      },
      row: {
        flexDirection: 'row',
      },
      row1: {
        flexDirection: 'row',
      },
      headerCell: {
        flex: 1,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
        backgroundColor: '#04aa6d',
        flexDirection:'row',
        justifyContent:'space-evenly'
      },
      headerCellText: {
        textAlign: 'center',
        fontWeight: 'bold',
      },
      cell: {
        flex: 1,
        padding: 6,
        borderWidth: 0.5,
        borderColor: 'grey',
        flexDirection:'row',
        justifyContent:'space-evenly',
        
      },
      cellText: {
        // textAlign: 'center',
      },
      dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: '#04aa6d',
        borderRadius: 5,
        padding: 12,
        shadowColor: '#000',
        
      },
      icon: {
        marginRight: 5,
      },
      item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textItem: {
        flex: 1,
        fontSize: 16,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'#fff'

      },
      iconStyle: {
        width: 15,
        height: 15,
backgroundColor:'#fff'
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    
  });