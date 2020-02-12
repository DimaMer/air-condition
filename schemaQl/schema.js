const graphql=require('graphql');const {
    GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt,GraphQLBoolean
} = graphql;
const axios = require('axios')

const {Item} = require('../models/Item')
const {Category} = require('../models/Category')

const CategoryType = new GraphQLObjectType({
    name: 'category',
    fields:{
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        catId: {type: GraphQLString}
    }
});



const UserType = new GraphQLObjectType({
    name: 'item',
    fields:{
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        subTitle: {type: GraphQLString},
            category: {type: new GraphQLList(CategoryType),
                resolve: async (parentValue, args)=>{
                    const wq = await Category.find({_id: { $in: parentValue.category } })
                    return wq
                }
        },
        description: {type: GraphQLString},
        photo: {type: GraphQLString},
        price: {type: GraphQLInt},
        notes: {type: GraphQLString},
        isActive: {type: GraphQLBoolean},
        date: {type: GraphQLString}
    }

});



const RootQuery = new GraphQLObjectType(
    {
        name: 'RootQueryType',
        fields: {
            item:{
                type: UserType,
                args: {id: {type: GraphQLID}},
                resolve: async (parentValue, args, context)=>{
                    console.log(context('req'));

                    const {id} = args;
                    const w = await Item.findById(id)

                    return w


                    // const w =  await axios.get(`http://localhost:3030/api/item/single?id=${id}`)

                    // return w.data
                }

            }
        }
    }
);


const mutation  = new GraphQLObjectType(
    {
        name:'Mutation',
        fields:{
            addItem:{
                type: UserType,
                args:{
                    title: {type: GraphQLString},
                    subTitle: {type: GraphQLString},
                    category: {type: GraphQLString },
                    description: {type: GraphQLString},
                    photo: {type: GraphQLString},
                    price: {type: GraphQLInt},
                    notes: {type: GraphQLString},
                    isActive: {type: GraphQLBoolean},
                    date: {type: GraphQLString}
                },
                resolve: (_, {title, subTitle, category, description, photo, price, notes}) => {
                    let v = new Item({title, subTitle, category, description, photo, price, notes});
                    return v.save()
                }

            }
        }
    }
)

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:mutation
})
