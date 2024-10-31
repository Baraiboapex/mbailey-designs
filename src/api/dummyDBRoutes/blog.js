import dayjs from "dayjs";

const blog = {
    searchableFieldsTypes:[
        {
            id:58760,
            fieldName:"datePosted",
            fieldTitleToRender:"Date Posted"
        },
        {
            id:685690,
            fieldName:"categories",
            fieldTitleToRender:"Categories"
        }
    ],
    blogData:[
        {
            id:75306345875869,
            datePosted:dayjs(new Date("07/12/2024 1:31 pm.").toISOString()).format("MM/DD/YYYY"),
            datePostedIso:new Date("07/12/2024 1:31 pm.").toISOString(),
            title:"The difficulty of marketting yourself and maintaining a positive outlook as an autistic developer when you are unemployed",
            content:`Help`,
            categories:[
                {
                    id:75965689,
                    title:"Soft-Skills Growth"
                }
            ],
            postComments:[
                {
                    id:66789589,
                    datePosted:new Date("07/12/2024 1:31 pm.").toISOString(),
                    postId:75306345875869,
                    commenter:"matthewpbaileydesigns@gmail.com",
                    content:"Hahahahahahaha! Poor 'Ol Gil!"
                }
            ]
        },
        {
            id:3466596809970,
            title:"Eh, yeah. AI is just another hype train. Sorry",
            datePosted:dayjs(new Date("07/13/2024 1:31 pm.").toISOString()).format("MM/DD/YYYY"),
            datePosted:new Date("07/13/2024 1:31 pm.").toISOString(),
            content:` "I'm afraid I cannot do that dave..." A chilling and albeit 
            terrifying line from Stanly Kubric's classic adaptation of the visionary novel 2001: a Space Odessy`,
            categories:[
                {
                    id:368456790,
                    title:"AI"
                }
            ],
            postComments:[
                {
                    id:676598697,
                    datePosted:new Date("07/13/2024 1:32 pm.").toISOString(),
                    postId:3466596809970,
                    commenter:"matthewpbaileydesigns@gmail.com",
                    content:"Crreepy!"
                }
            ]
        },
        {
            id:5643123065376,
            title:"But I know javascript! Is that enough?",
            datePosted:dayjs(new Date("07/14/2024 1:31 pm.").toISOString()).format("MM/DD/YYYY"),
            datePosted:new Date("07/14/2024 1:34 pm.").toISOString(),
            content:`This honestly is kind of a tough question to answer, 
            and to be honest, it depends on where you are located.`,
            categories:[
                {
                    id:657567845643,
                    title:"Technical Skills Growth"
                }
            ],
            postComments:[
                {
                    id:66789589,
                    datePosted:new Date("07/14/2024 1:34 pm.").toISOString(),
                    postId:5643123065376,
                    commenter:"matthewpbaileydesigns@gmail.com",
                    content:"Yikes! this hits hard!"
                }
            ]
        }
    ],
    blogCommentData:[
        {
            id:66789589,
            datePosted:new Date("07/12/2024 1:31 pm.").toISOString(),
            postId:75306345875869,
            commenter:"matthewpbaileydesigns@gmail.com",
            content:"Hahahahahahaha! Poor 'Ol Gil!"
        },
        {
            id:676598697,
            datePosted:new Date("07/13/2024 1:32 pm.").toISOString(),
            postId:3466596809970,
            commenter:"matthewpbaileydesigns@gmail.com",
            content:"Crreepy!"
        },
        {
            id:66789589,
            datePosted:new Date("07/14/2024 1:34 pm.").toISOString(),
            postId:5643123065376,
            commenter:"matthewpbaileydesigns@gmail.com",
            content:"Yikes! this hits hard!"
        }
    ]
};

export default blog;