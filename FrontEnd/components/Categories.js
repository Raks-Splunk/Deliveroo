import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoriesCard from './CategoriesCard'
import sanityClient, { urlFor } from '../sanity';

const Categories = () => {
  const [categories, setCategories] = useState();

  useEffect(()=>{
    sanityClient.fetch
    (`
        *[_type == "category"]

    `)
    .then((data) => { 
      setCategories(data);
     });
  }, []);
// console.log(categories);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}>
      {/* Categories card */}

      {categories?.map((category)=>(
        <CategoriesCard
           key={category._id}
           imgUrl={urlFor(category.image).url()}
           title={category.name}
        />
      ))}
    </ScrollView>
  )
}

export default Categories