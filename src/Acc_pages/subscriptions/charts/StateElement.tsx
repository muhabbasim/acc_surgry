import { Box, CardContent, Typography } from '@mui/material'
import Translatable from 'src/Acc_components/translatable_text/Translatable'


type Props = {
  icon: any;
  title: string;
  count: number;
  color: string;
}
export default function StateElement({ title, icon, count, color }: Props) {
  return (
    <Box bgcolor={ color +".light"} textAlign="center">
      <CardContent>
        <img src={icon} alt='icon' width="50" />
        <Typography
          color={ color +'.main'}
          mt={1}
          variant="subtitle1"
          fontWeight={600}
        >
          <Translatable>
            {title} 
          </Translatable>
        </Typography>
        <Typography color={ color +'.main'} variant="h4" fontWeight={600}>
          {count}
        </Typography>
      </CardContent>
    </Box>
  )
}
