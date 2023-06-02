import React from 'react';
import { View, StyleSheet, Text,TouchableOpacity, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUpAZ} from '@fortawesome/free-solid-svg-icons';



function TableComponent() {
    const [data, setData] = useState([
        { Id: '1', Name: 'John', Email: 'John123@gmail.com',Date:'2-01-2023',priority:'Low',Task:'Alpha' },
        { Id: '2', Name: 'Sandy', Email:  'Sandy@gmail.com',Date:'6-01-2023',priority:'Low',Task:'Beta' },
        { Id: '3', Name: 'Bob', Email: 'Bobfrancis@gmail.com',Date:'25-01-2023',priority:'High',Task:'Gamma' },
        { Id: '4', Name: 'Stony', Email: 'Stonywills@gmail.com',Date:'2-02-2023',priority:'Medium',Task:'Tester' },
        { Id: '5', Name: 'Stark', Email:'Stark@gmail.com',Date:'7-02-2023',priority:'High',Task:'Gun' },
        { Id: '6', Name: 'Dhoni', Email: 'DhoniCsk@gmail.com',Date:'16-02-2023',priority:'Low',Task:'Hunting' },
        { Id: '7', Name: 'Willams', Email: 'Willams321@gmail.com',Date:'18-03-2023',priority:'Medium',Task:'Running' },
        { Id: '8', Name: 'Rocky', Email: 'Rockyboy@gmail.com',Date:'20-03-2023',priority:'Medium',Task:'Footbal' },
        { Id: '9', Name: 'Stepen', Email: 'Stepandh@gmail.com',Date:'6-04-2023',priority:'High',Task:'Cricket' },
        { Id: '10', Name: 'bejoy', Email: 'bejoygroups@gmail.com',Date:'2-05-2023',priority:'Low',Task:'Rider' },
      ]);
    //   const [value, setValue] = useState(null);

    //   const sort = [
    //     { label: 'Ascending', value: 'Ascending' },
    //     { label: 'Decending', value: 'Decending' },
       
    //   ];

   
    const [sortAscending, setSortAscending] = useState(true);

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

  const toggleSort1 = (column) => {
    setSortAscending(!sortAscending);
  
    const sortedData = [...data].sort((a, b) => {
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
  
    setData(sortedData);
  };
  
  
  return (
    <View style={styles.container}>
            <ScrollView>
{/* 
    <View style={{width:170}} >
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={sort}

        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select order"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          toggleSort(item.value)
        }}
        
       
      />
</View>        */}
    <View style={styles.table}>
      <View style={styles.row}>
        <View style={styles.headerCell}>
          <Text style={styles.headerCellText}>Id</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerCellText}>Name</Text>
          <TouchableOpacity style={{marginLeft:28}} onPress={()=>toggleSort('Name')}>
              <FontAwesomeIcon icon={faArrowUpAZ} color='#0B3E5D' size={15} />
            </TouchableOpacity>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerCellText}>Email</Text>
          <TouchableOpacity style={{marginLeft:28}} onPress={()=>toggleSort('Email')} >
              <FontAwesomeIcon icon={faArrowUpAZ} color='#0B3E5D' size={15} />
            </TouchableOpacity>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerCellText}>Date</Text>
          <TouchableOpacity style={{marginLeft:28}}onPress={()=>toggleSort1('Date')} >
              <FontAwesomeIcon icon={faArrowUpAZ} color='#0B3E5D' size={15} />
            </TouchableOpacity>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerCellText}>priority</Text>
          <TouchableOpacity style={{marginLeft:28}} onPress={()=>toggleSort('priority')}>
              <FontAwesomeIcon icon={faArrowUpAZ} color='#0B3E5D' size={15} />
            </TouchableOpacity>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerCellText}>Task</Text>
           <TouchableOpacity style={{marginLeft:28}} onPress={()=>toggleSort('Task')} >
              <FontAwesomeIcon icon={faArrowUpAZ} color='#0B3E5D' size={15} />
            </TouchableOpacity>
        </View>
      </View>
      {data.map((item, index) => (
        <View style={styles.row} key={index}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{item.Id}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{item.Name}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{item.Email}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{item.Date}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{item.priority}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{item.Task}</Text>
            {/* <View style={{marginTop:5}}>
        <Progress.Bar progress={0.3} 
        width={null}  borderWidth={0.5}
         indeterminate={false} color="lightgreen"
          borderRadius={2} borderColor="black"/>
        </View> */}
          </View>
        </View>
      ))}
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
      row: {
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
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
      },
      cellText: {
        textAlign: 'center',
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