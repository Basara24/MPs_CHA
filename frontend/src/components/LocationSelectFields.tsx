import { useBrazilLocation } from '../hooks/useBrazilLocation';

interface LocationSelectFieldsProps {
  estado: string;
  cidade: string;
  onEstadoChange: (value: string) => void;
  onCidadeChange: (value: string) => void;
  estadoError?: string;
  cidadeError?: string;
}

export function LocationSelectFields({
  estado,
  cidade,
  onEstadoChange,
  onCidadeChange,
  estadoError,
  cidadeError,
}: LocationSelectFieldsProps) {
  const { states, cities, statesLoading, citiesLoading, statesError, citiesError } =
    useBrazilLocation(estado);

  return (
    <div className="location-fields">
      <div className="form-grid">
        <select
          value={estado}
          onChange={(event) => {
            onEstadoChange(event.target.value);
            onCidadeChange('');
          }}
          aria-label="Estado"
        >
          <option value="">
            {statesLoading ? 'Carregando estados...' : 'Selecione o estado'}
          </option>
          {states.map((state) => (
            <option key={state.id} value={state.sigla}>
              {state.nome} ({state.sigla})
            </option>
          ))}
        </select>
        {(estadoError || statesError) && <p className="error">{estadoError ?? statesError}</p>}
      </div>

      <div className="form-grid">
        <select
          value={cidade}
          onChange={(event) => onCidadeChange(event.target.value)}
          disabled={!estado || citiesLoading}
          aria-label="Cidade"
        >
          <option value="">
            {!estado
              ? 'Selecione o estado primeiro'
              : citiesLoading
                ? 'Carregando cidades...'
                : 'Selecione a cidade'}
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.nome}>
              {city.nome}
            </option>
          ))}
        </select>
        {(cidadeError || citiesError) && <p className="error">{cidadeError ?? citiesError}</p>}
      </div>
    </div>
  );
}
