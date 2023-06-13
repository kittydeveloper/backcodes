import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, ScrollView,PanResponder
} from 'react-native';
import data1 from './MOCK_DATA .json'
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUpAZ, faArrowDownAZ} from '@fortawesome/free-solid-svg-icons';



function TableComponent() {
  const [data, setData] = useState(data1)
   const [columns,setColumns] = useState([]);
   const scrollViewRef=useRef(null)
   const [sortAscending, setSortAscending] = useState(true);
   const contentHeightRef = useRef(0);
   const scrollViewHeightRef = useRef(0);
   const rowHeightRef = useRef(0);
   const currentRowRef = useRef(0);

const fetchColumn = ()=>{
    const tempObj = data[0]
    const columnnames = Object.keys(tempObj)
    setColumns(columnnames)
  }
  

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    console.log(contentHeightRef,'HEIGHT',contentHeight)
    contentHeightRef.current = contentHeight;
  };

  const handleLayout = (event) => {
    console.log(scrollViewHeightRef.current,'handlelayout',event.nativeEvent.layout.height)
    scrollViewHeightRef.current = event.nativeEvent.layout.height;
  };
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const nextRow = currentRowRef.current + 15;
      console.log(nextRow,'hhhhhhhhhhhhhh')
      const maxRow = Math.floor(contentHeightRef.current / rowHeightRef.current);
      console.log(maxRow,'maxrow',rowHeightRef.current,'rowref',contentHeightRef.current)

     
      if (nextRow > maxRow) {
        const scrollToOffset = 0;
        scrollViewRef.current.scrollTo({ y: scrollToOffset, animated: true });
        currentRowRef.current = 0;
        return;
      }

      const scrollToOffset = nextRow * rowHeightRef.current;
      console.log(scrollToOffset,nextRow,rowHeightRef,'offest')
      scrollViewRef.current.scrollTo({ y: scrollToOffset, animated: true });
      currentRowRef.current = nextRow;
      console.log(currentRowRef.current,'ccc',nextRow)
    }, 3000);

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

useEffect(()=>{
    fetchColumn()
  },[])
  
 const toggleSort1 = (column, index) => {
    setSortAscending(!sortAscending);

    const sortedData = [...data].sort((a, b) => {
      if (sortAscending) {
        if (column === "date") {
        
         const [aDay, aMonth, aYear] = a.date.split('/');
  const [bDay, bMonth, bYear] = b.date.split('/');

  if (aYear !== bYear) {
    return aYear - bYear;
  }
if (aMonth !== bMonth) {
    return aMonth - bMonth;
}
  return aDay - bDay;
        } else {
          if(typeof(a[column])==='string' && typeof(b[column])){
          console.log('column')
          return a[column]?.localeCompare(b[column]);
          }
          else{
            return a[column]-b[column];
          }
        }
      } else {
        if (column === "date") {
         
          const [aDay, aMonth, aYear] = a.date.split('/');
          const [bDay, bMonth, bYear] = b.date.split('/');
        if (aYear !== bYear) {
            return bYear - aYear;
          }
          if (aMonth !== bMonth) {
            return bMonth - aMonth;
          }
          return bDay - aDay;
   } else {
          if(typeof(a[column])==='string' && typeof(b[column])){
          return b[column]?.localeCompare(a[column]);
            }
            else{
              return b[column]-a[column];
            }
           }
      }
    });

    setData(sortedData);
  };
 return (
    <View style={styles.container}>
     <ScrollView ref={scrollViewRef}  pagingEnabled onContentSizeChange={handleContentSizeChange}
      onLayout={handleLayout}
      scrollEventThrottle={16} >
        <View style={styles.table1} >
          <View style={styles.row1} >
            {
              columns?.map((key, index) => (
                <View style={styles.headerCell}  key={index}>
                  <TouchableOpacity activeOpacity={0.2}>
                    <Text style={{ flexDirection: 'row', color: 'white' }} >{key}</Text>
                  </TouchableOpacity>

                 {!sortAscending ?
                    <TouchableOpacity style={{ marginLeft: 28 }} activeOpacity={0.2} onPress={() => toggleSort1(key, index)} >
                      <FontAwesomeIcon icon={faArrowDownAZ} color='#0B3E5D' size={15} />
                    </TouchableOpacity> :
                    <TouchableOpacity style={{ marginLeft: 28 }} activeOpacity={0.2} onPress={() => toggleSort1(key, index)} >
                      <FontAwesomeIcon icon={faArrowUpAZ} color='#0B3E5D' size={15} />
                    </TouchableOpacity>
                  }</View>
                   ))
            }
          </View>
          {
           data?.map((row, rowIndex) => (
              <View style={styles.row} key={rowIndex}  onLayout={(event) => {
                if (rowIndex === 0) {
                  rowHeightRef.current = event.nativeEvent.layout.height;
                }
              }} >
                {columns.map((column, index) => (
                  <View style={[styles.cell, { backgroundColor: rowIndex % 2 === 0 ? "white" : "lightgray" }]} key={index}>

                    {column === 'progress' ? (
                     <View  style={{ backgroundColor: 'green', width: `${row[column]}%`, marginLeft: -80 }} >

                     </View>) : ( <Text style={{ color: 'black' }}>{row[column]}</Text>)
                    }
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
    padding: 18
  },
 
  
  table1: {
    borderColor: 'black',
    marginTop: -5
  },
  row: {
    display: 'flex',
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
    // backgroundColor: '#04aa6d',
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  headerCellText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  cell: {
    flex: 1,
    padding: 6,
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
 });