import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { City, CityName } from '../../types/city.type.js';
import { Location } from '../../types/location.type.js';

const { prop, modelOptions } = typegoose;


export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
  },
})
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({
    required: true,
    trim: true,
    type: String, // TODO narrow in down to 'CityName'
    unique: true,
  })
  public name!: CityName;


  @prop({
    required: true,
  })
  public location!: Location;

}

export const CityModel = getModelForClass(CityEntity);
