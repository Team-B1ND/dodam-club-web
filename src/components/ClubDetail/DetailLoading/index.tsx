import { Link } from 'react-router-dom'
import * as S from './style'
import { ArrowLeft, Close } from '@b1nd/dds-web'
import { useTheme } from 'styled-components';

const DetailLoading = ({type}: {type: "MODAL"|"PAGE"}) => {
  const theme = useTheme()

  return (
    <S.DetailSkelletonContainer $type={type}>
      {type == 'PAGE'
      ? <Link to={'/'}><ArrowLeft $svgStyle={{cursor:'pointer'}} color={theme.labelNormal}/></Link>
      : <div onClick={close}><Close $svgStyle={{cursor:'pointer'}}/></div>}
    </S.DetailSkelletonContainer>
  )
}

export default DetailLoading