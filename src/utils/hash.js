import crpto from 'crypto'

const Hash = (value)=>{
  return crpto.createHash('sha256').update(value).digest('hex')
}

export {
  Hash
}