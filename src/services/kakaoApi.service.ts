import { BadRequestException, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class KakaoApiService {
  async getLatLng(address: string) {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json`,
      {
        params: {
          query: address,
        },
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      }
    );

    const documents = response.data.documents;
    if (documents.length <= 0)
      throw new BadRequestException("주소가 잘못되었습니다.");
    const { y: lat, x: lng } = documents[0];
    return { lat, lng };
  }
}
