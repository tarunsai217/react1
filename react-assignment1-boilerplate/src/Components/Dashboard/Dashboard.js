import React, { useState ,useEffect} from 'react'
import { Container,Row,Col,InputGroup,FormControl,Button } from 'react-bootstrap'
import Card from '../Card/Card'
import styles from './Dashboard.module.css'
function Dashboard() {
    const [news, setNews] = useState([])
    const [query,setQuery]=useState('');
    
    useEffect(() => {
        async function fetchData(){
            let response= await fetch('https://newsapi.org/v2/top-headlines?country=in&apikey=e4feac144af142e3a3d531e9dd26e950&page=1')
            let data=await response.json();
            setNews(data.articles)
        }
        fetchData();
    }, [])

    const search=async()=>{
        let response= await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=e4feac144af142e3a3d531e9dd26e950&language=en&page=1`)
        let data=await response.json();
        setNews(data.articles);
    }

    const fetchCategory=async(option)=>{
        console.log(option);
        if(option==''){return }
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${option}&apikey=e4feac144af142e3a3d531e9dd26e950&page=1`
          );
          const data = await response.json();   
          setNews(data.articles);
    }

    const savedNews=()=>{
        let news=JSON.parse(localStorage.getItem('news'))
        setNews(news);
    }
    
  return (

    <div>
        <Container className='search'>
            
        <InputGroup  style={{width:'60%'}} className="mb-3 ml-auto">
        <button onClick={savedNews} className="btn btn-secondary mr-5">Saved News</button>
        <select
            className="form-select"
            style={{ padding: "0px 30px" }}
            id="categorySearch"
            onChange={(e) => {fetchCategory(e.target.value)}}
        >
            <option value="">Select Category</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Technology">Tech</option>
            <option value="politics">Politics</option>
        </select>   
          <FormControl
            placeholder="Search for news..."
            aria-label="Search for news..."
            aria-describedby="basic-addon2"
            value={query}
            onChange={(e)=>{setQuery(e.target.value)}}
          />
          <Button onClick={()=>{search()}} variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
        </Container>
        
        
        <Container  className={styles.grid}>
            {news.map(item=>{ return <Col key={item.title}><Card data={item}/> </Col>})}
        </Container>
    </div>
  )
}

export default Dashboard