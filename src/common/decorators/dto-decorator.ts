export const ValidateDTO = <T>(
  dtoClass: T,
  source: 'body' | 'params' | 'query',
) => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const existingMetadata = Reflect.getMetadata('dto', descriptor.value) || [];
    const newMetadata = [...existingMetadata, { dtoClass, source }];
    Reflect.defineMetadata('dto', newMetadata, descriptor.value);
  };
};
