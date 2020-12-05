import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import useComponentWillMount from './useComponentWillMount'

const ProductCarousel = () => {
  const dispatch = useDispatch()


  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  const [smallWindow, setSmallWindow] = useState(false);
  
  useComponentWillMount(() => {
    if (window.innerWidth <= 750) {
      setSmallWindow(true);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 750) {
        setSmallWindow(true);
      } else {
        setSmallWindow(false);
      }
    });
  });

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch,smallWindow])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid className="d-block" style={{margin:"auto"}}/>
            <Carousel.Caption className='carousel-caption'>
              {smallWindow? <h6 style={{color:"white"}}> {product.name} ({product.price}L.E)</h6> :<h3>
                {product.name} ({product.price}L.E)
              </h3>}
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel