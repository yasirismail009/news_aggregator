import * as React from 'react';
import { Typography, Button, Card, CardActionArea, CardMedia, CardContent, CardActions, Tooltip, Divider, Box } from '@mui/material';
import NewsPlaceHolder from '../assets/news_placeholdere.jpg'
import { formatDate } from '../utils/dateTime';

interface ArticleCardProps {
  article: any;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      
      <CardMedia
        component="img"
        height="140"
        image= {imageError?NewsPlaceHolder:article?.urlToImage?article?.urlToImage:NewsPlaceHolder}
        alt="green iguana"
        onError={() => setImageError(true)}
      />
      <CardContent>
      {/* Title with Tooltip */}
      <Tooltip title={article?.title || article?.news_desk}>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 600,
            maxHeight: '30px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {article?.title || article?.news_desk || article?.sectionName}
        </Typography>
      </Tooltip>

      {/* Source and Published Date */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '10px 0',
        }}
      >

        {/* Published Date */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          <Typography sx={{ fontSize: '10px', fontWeight: 600 }}>Published At:</Typography>
          <Typography sx={{ fontSize: '10px', fontWeight: 600 }}>
            {formatDate(article?.publishedAt || article?.pub_date || article?.webPublicationDate)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ marginBottom: '10px' }} />

      {/* Description or Abstract with Tooltip */}
      <Tooltip title={article?.description || article?.abstract}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '12px',
            height: '70px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            lineHeight: '1.2',
          }}
        >
          {article?.description || article?.abstract || article?.webTitle}
        </Typography>
      </Tooltip>
    </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary"  onClick={() => window.open(article?.url, '_blank')}>
        Explore More 
      </Button>
    </CardActions>
  </Card>
  );
};

export default ArticleCard;
