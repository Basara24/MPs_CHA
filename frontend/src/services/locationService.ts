import axios from 'axios';

const ibgeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

export interface BrazilianState {
  id: number;
  sigla: string;
  nome: string;
}

export interface BrazilianCity {
  id: number;
  nome: string;
}

interface IbgeStateResponse {
  id: number;
  sigla: string;
  nome: string;
}

interface IbgeCityResponse {
  id: number;
  nome: string;
}

export async function fetchBrazilianStates(): Promise<BrazilianState[]> {
  const { data } = await ibgeApi.get<IbgeStateResponse[]>(
    '/estados?orderBy=nome',
  );

  return data.map((state) => ({
    id: state.id,
    sigla: state.sigla,
    nome: state.nome,
  }));
}

export async function fetchCitiesByState(stateCode: string): Promise<BrazilianCity[]> {
  const normalizedCode = stateCode.trim().toUpperCase();
  if (!normalizedCode) {
    return [];
  }

  const { data } = await ibgeApi.get<IbgeCityResponse[]>(
    `/estados/${normalizedCode}/municipios?orderBy=nome`,
  );

  return data.map((city) => ({
    id: city.id,
    nome: city.nome,
  }));
}
