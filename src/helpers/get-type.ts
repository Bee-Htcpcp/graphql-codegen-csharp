import { SafeString } from 'handlebars';


export function getType(type, options) {
  if (!type) {
    return '';
  }


  

  var computedType = null;
  if ( type.type == 'Date')
  {
    computedType= "DateTime";
  }
  else if (type.type == 'Email' )
  {
    computedType= "Email";
  }
  else if (type.type == 'Language')
  {
    computedType= "Language"; // TO BE ADDED IN THE BEEZUP FRAMEWORK
  }


  //console.log(type);

  // Get Type based on Array Type and Normal Class or object Type.
  const baseType = type.type;
  let realType = computedType || options.data.root.primitivesMap[baseType] || baseType;

  if ( type.isType
    && ! type.isInputType
    && ! type.isInterface)
  {
    realType=realType+"ResolverBase";
  }

  const useImmutable = !!(options.data.root.config || {}).immutableTypes;

  if( type.isRequired)
  {
    realType = `NonNull<${realType}>`;
  }

  if (type.isArray) {
    let result = realType;
    result = `List<${result}>`;
    return new SafeString(result);
  } else {
    return new SafeString(realType);
  }
}
