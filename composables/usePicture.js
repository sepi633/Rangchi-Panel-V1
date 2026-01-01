export default function (){
    const {
        public: { showImageBaseUrl },
      } = useRuntimeConfig();
      
    function getPicUrl(_picture,_size){
        if(_picture){
            if(_size)
            return showImageBaseUrl + _picture?.baseUrl + '/'+_picture.guidName  +_picture.extension
        else
        return showImageBaseUrl + _picture?.baseUrl + '/'+_picture.guidName +_picture.extension
        }
    else
    return 'undef'
    }

    function setdefault(e){
        
        e.target.src = "/img/placeholder.jpg"
        }

    function getFileUrl(_file){
        return showImageBaseUrl + _file?.url
    }
    return {getPicUrl,setdefault,getFileUrl}
}