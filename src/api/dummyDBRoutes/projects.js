import dayjs from "dayjs";

const projects = {
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
    projectsData:[
        {
            id:867056670,
            datePostedIso:new Date("07/12/2024 1:31 pm.").toISOString(),
            datePosted:dayjs(new Date("07/12/2024 1:31 pm.").toISOString()).format("MM/DD/YYYY"),
            title:"GNBC Japanese Class Tools Suite",
            projectImage:"/assets/images/japanese-class-suite.png",
            aboutProject:"For my church, I built a handful of tools for our japanese class using node.js, google apps scripts, and Vue.js!",
            projectLink:null,
            categories:[
                {
                    id:75965689,
                    title:"Not-For-Profit Projects"
                }
            ],
            projectComments:[
                {
                    id:66789589,
                    datePosted:new Date("07/12/2024 1:31 pm.").toISOString(),
                    projectId:867056670,
                    commenter:"matthewpbaileydesigns@gmail.com",
                    content:"Comment on dis"
                }
            ]
        },
        {
            id:36545365678,
            title:"Jax Tides",
            datePostedIso:new Date("07/12/2024 1:31 pm.").toISOString(),
            datePosted:dayjs(new Date("07/14/2024 1:31 pm.").toISOString()).format("MM/DD/YYYY"),
            projectImage:"/assets/images/Screenshot_2024-10-30_004137.png",
            aboutProject:"This is a neat little application that I made with React.js while using the NOAA tides API for data!",
            projectLink:"https://baraiboapex.github.io/jax-tides",
            categories:[
                {
                    id:368456790,
                    title:"Personal Projects"
                }
            ],
            projectComments:[
                {
                    id:66789589,
                    datePosted:new Date("07/14/2024 1:31 pm.").toISOString(),
                    projectId:36545365678,
                    commenter:"matthewpbaileydesigns@gmail.com",
                    content:"Comment on dis"
                }
            ]
        }
    ],
    projectComments:[
        {
            id:66789589,
            datePosted:new Date("07/12/2024 1:31 pm.").toISOString(),
            projectId:867056670,
            commenter:"matthewpbaileydesigns@gmail.com",
            content:"Comment on dis"
        },
        {
            id:66789589,
            datePosted:new Date("07/14/2024 1:31 pm.").toISOString(),
            projectId:36545365678,
            commenter:"matthewpbaileydesigns@gmail.com",
            content:"Comment on dis"
        }
    ]
};

export default projects;