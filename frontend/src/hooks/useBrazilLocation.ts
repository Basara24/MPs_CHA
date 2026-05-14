import { useEffect, useState } from 'react';
import type { BrazilianCity, BrazilianState } from '../services/locationService';
import { fetchBrazilianStates, fetchCitiesByState } from '../services/locationService';

export function useBrazilLocation(selectedState: string) {
  const [states, setStates] = useState<BrazilianState[]>([]);
  const [cities, setCities] = useState<BrazilianCity[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [statesError, setStatesError] = useState('');
  const [citiesError, setCitiesError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadStates() {
      setStatesLoading(true);
      setStatesError('');

      try {
        const data = await fetchBrazilianStates();
        if (active) {
          setStates(data);
        }
      } catch {
        if (active) {
          setStatesError('Nao foi possivel carregar os estados.');
        }
      } finally {
        if (active) {
          setStatesLoading(false);
        }
      }
    }

    void loadStates();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadCities() {
      if (!selectedState) {
        setCities([]);
        setCitiesError('');
        setCitiesLoading(false);
        return;
      }

      setCitiesLoading(true);
      setCitiesError('');

      try {
        const data = await fetchCitiesByState(selectedState);
        if (active) {
          setCities(data);
        }
      } catch {
        if (active) {
          setCities([]);
          setCitiesError('Nao foi possivel carregar as cidades deste estado.');
        }
      } finally {
        if (active) {
          setCitiesLoading(false);
        }
      }
    }

    void loadCities();
    return () => {
      active = false;
    };
  }, [selectedState]);

  return {
    states,
    cities,
    statesLoading,
    citiesLoading,
    statesError,
    citiesError,
  };
}
