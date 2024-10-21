const formatDate = (date)=>{
    const test = new Date(date)
    return `${test.getDate() +   '/' +   test.getMonth() +   '/' + test.getFullYear()}`
}


export const  mockPdfData = [
{
    name:'online admin guide',
    date: formatDate(new Date()),
    size: '200kb',
    product:'admin product',
    module:'*',
    expiry:'NA',
    x:'shu',
    fileTtype: 'pdf',
    id:1
},
{
    name:'online super admin guide',
    date: formatDate('10-12-2023'),
    size: '70kb',
    product:'supert admin product',
    module:'no module',
    expiry:'NA',
    fileTtype: 'doc',
    id:2
},
{
    name:'online use guide file for test',
    date: formatDate('10-12-2020'),
    size: '70kb',
    product:'supert admin product',
    module:'no module',
    expiry:'NA',
    fileTtype: 'doc',
    id:3
},
]

// export mockPdfData
