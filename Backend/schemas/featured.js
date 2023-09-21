export default {
    name: "featured",
    titte: "Featured Menu categories",
    type: "document",
    fields: [
        {
        name: "name",
        type: "string",
        titte: "Featured Category name",
        validation: (Rule) => Rule.required(),
        },
        {
            name: "short_description",
            type: "string",
            title: "Short Description",
            validation: (Rule) =>Rule.required()
        },
        {
            name: "restaurants",
            type: "array",
            title: "Restaurants",
            of: [{type: "reference" , to: [{type: "restaurant"}]}],
        }
    ]
}