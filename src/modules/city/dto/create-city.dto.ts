import { CityName } from '../../../types/city.type';
import { Location } from '../../../types/location.type';


export default class CreateCityDto {
  public location!: Location;
  public name!: CityName;
}
