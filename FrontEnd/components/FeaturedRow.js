import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/solid'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({ id, title, description, featuredCategory }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        sanityClient.fetch(
            `
            *[_type == "featured" && _id == $id] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                    type->{
                        name
                    }
                },
            }[0]
            `,
            { id }
        ).then(data=>{
            setRestaurants(data?.restaurants); 
        });
    }, []);
    return (
        <View >
            <View className="flex-row mt-4 items-center px-4 justify-between">
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>
            <Text className="text-xs font-bold text-gray-500 px-4">{description}</Text>

            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    paddingHorizontal: 15,

                }}
                showsHorizontalScrollIndicator={false}
                className="pt-4"
            >
                {/* RestaurantCards */}

                {restaurants?.map(restaurant=>(
                    <RestaurantCard
                    key={restaurant._id}
                    id={restaurant._id}
                    imgUrl={restaurant.image}
                    title={restaurant.name}
                    rating={restaurant.rating}
                    genre={restaurant.type?.name}
                    address={restaurant.address}
                    short_description={restaurant.short_description}
                    dishes={restaurant.dishes}
                    long={restaurant.long}
                    lat={restaurant.lat}
                    
                />
                ))}
            </ScrollView>
        </View>
    )
}

export default FeaturedRow