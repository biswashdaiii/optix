import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getProducts } from './apiCore.js';
import Card from './Card.jsx';
import Footer from './Footer';
import { Box, Container, Typography, Button, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Color palette
const PRIMARY_COLOR = '#0A6A7A';
const SECONDARY_COLOR = '#0A2F68';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#E8E8E8',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

const HeroGrid = styled(Grid)(({ theme }) => ({
  alignItems: 'center',
  minHeight: '500px',
}));

const HeroText = styled(Box)(({ theme }) => ({
  zIndex: 1,
}));

const CategoryBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 0),
  marginBottom: theme.spacing(2),
  fontSize: '0.95rem',
  fontWeight: 500,
  color: PRIMARY_COLOR,
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.75rem',
  fontWeight: 700,
  lineHeight: 1.3,
  marginBottom: theme.spacing(2),
  color: '#1A1A1A',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.25rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.85rem',
  },
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: 1.7,
  marginBottom: theme.spacing(4),
  color: '#4A4A4A',
  maxWidth: '480px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: '12px 32px',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 600,
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&.primary': {
    background: SECONDARY_COLOR,
    color: 'white',
    boxShadow: '0 4px 15px rgba(10, 47, 104, 0.3)',
    '&:hover': {
      background: '#082554',
      boxShadow: '0 6px 20px rgba(10, 47, 104, 0.4)',
      transform: 'translateY(-2px)',
    },
  },
  '&.secondary': {
    border: `2px solid ${SECONDARY_COLOR}`,
    color: SECONDARY_COLOR,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: `${SECONDARY_COLOR}10`,
      transform: 'translateY(-2px)',
    },
  },
}));

const SlideShowContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '550px',
  height: '450px',
  backgroundColor: '#D9D9D9',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  margin: '0 auto',
}));

const SlideImage = styled('img')({
  maxWidth: '65%',
  maxHeight: '65%',
  objectFit: 'contain',
  transition: 'opacity 0.5s ease-in-out',
});

const SlideButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: SECONDARY_COLOR,
  width: '40px',
  height: '40px',
  '&:hover': {
    backgroundColor: 'white',
  },
  '&.prev': {
    left: '10px',
  },
  '&.next': {
    right: '10px',
  },
}));

const VirtualTryButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: '30px',
  right: '30px',
  backgroundColor: 'white',
  color: SECONDARY_COLOR,
  borderRadius: '25px',
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 600,
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#F5F5F5',
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: SECONDARY_COLOR,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

// Slideshow images
const slideImages = [
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&h=600&fit=crop',
];

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  return (
    <Layout
      title='Home'
      description='Your online one stop shop for eyewear'
      className='container-fluid'
    >
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth='lg'>
          <HeroGrid container spacing={4}>
            <Grid item xs={12} md={6}>
              <HeroText>
                <CategoryBadge>
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: PRIMARY_COLOR,
                    }}
                  />
                  optix - Glasses & Eyewear
                </CategoryBadge>
                
                <HeroTitle>
                  Perfect Glasses for Your Unique Style
                </HeroTitle>
                
                <HeroDescription>
                  Find eyewear that matches your look and lifestyle, with a virtual try-on so you can see the fit before you buy.
                </HeroDescription>
                
                <Box>
                  <StyledButton 
                    className='primary' 
                    variant='contained'
                    component={Link}
                    to='/shop'
                  >
                    Browse Women
                  </StyledButton>
                  <StyledButton 
                    className='secondary' 
                    variant='outlined'
                    component={Link}
                    to='/shop'
                  >
                    Browse Men
                  </StyledButton>
                </Box>
              </HeroText>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <SlideShowContainer>
                <SlideImage
                  src={slideImages[currentSlide]}
                  alt={`Glasses ${currentSlide + 1}`}
                  key={currentSlide}
                />
                
                <SlideButton className="prev" onClick={prevSlide}>
                  <NavigateBeforeIcon />
                </SlideButton>
                
                <SlideButton className="next" onClick={nextSlide}>
                  <NavigateNextIcon />
                </SlideButton>

                <VirtualTryButton>
                  <Box
                    component="img"
                    src='https://cdn-icons-png.flaticon.com/512/2593/2593549.png'
                    alt='Virtual Try'
                    sx={{ width: 20, height: 20 }}
                  />
                  Try Virtually
                </VirtualTryButton>
              </SlideShowContainer>
            </Grid>
          </HeroGrid>
        </Container>
      </HeroSection>

      {/* Top Picks Section */}
      <Container maxWidth='lg' sx={{ mb: 8 }}>
        <SectionTitle variant='h4'>Top Picks</SectionTitle>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {productsBySell.slice(0, 4).map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </Box>
      </Container>

      <Footer />
    </Layout>
  );
};

export default Home;