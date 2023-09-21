import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    UserIcon,
    ChevronDownIcon,
    AdjustmentsVerticalIcon,
    MagnifyingGlassCircleIcon,
    MagnifyingGlassIcon,

} from "react-native-heroicons/solid";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setfeaturedCategories] = useState();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() =>{
        sanityClient.fetch(`
        *[_type == "featured"] {
                ...,
                restaurants[] ->{
                     ...,
                dishes[] ->,
                },
            }
        `).then((data) =>{
            setfeaturedCategories(data);
        })
    }, [])

    return (
        <SafeAreaView className="bg-white pt-5">

            {/* Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    source={{
                        uri: "https://links.papareact.com/wru",
                    }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">
                        Deliver Now!
                    </Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>
                <UserIcon size={33} color="#00CCBB" />
                {/* <UserIcon size={35} color="#00CCBB" /> */}
            </View>

            {/* Search */}
            <View className="flex-row items-center pb-2">
                <View className="flex-row pb-2 mx-3 space-x-2 bg-gray-200 items-center pl-2 pt-1 flex-1">
                    <MagnifyingGlassIcon color="gray" size={20} />
                    <TextInput placeholder="Restaurants and cuisines" keyboardType="default"></TextInput>
                </View>
                <View className="pr-4">
                    <AdjustmentsVerticalIcon color="#00CCBB" />
                </View>
            </View>
            {/* Body */}
            <ScrollView className="bg-gray-100"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}>
                    {/* Categories */}
                    <Categories/>


                    {/* Featured Rows */}
                    {featuredCategories?.map((category)=>(
                        <FeaturedRow
                           key={category._id}
                           id={category._id}
                           title={category.name}
                           description={category.short_description}
                        />                        
                    ))}
                </ScrollView>
        </SafeAreaView>
        
            )
}

            export default HomeScreen