/*
 * SonarQube
 * Copyright (C) 2009-2022 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import SizeRating from '../../../components/ui/SizeRating';
import { translate } from '../../../helpers/l10n';
import { getSizeRatingAverageValue, getSizeRatingLabel } from '../../../helpers/ratings';
import { RawQuery } from '../../../types/types';
import { Facet } from '../types';
import Filter from './Filter';
import FilterHeader from './FilterHeader';

export interface Props {
  className?: string;
  facet?: Facet;
  maxFacetValue?: number;
  onQueryChange: (change: RawQuery) => void;
  property?: string;
  value?: any;
}

export default function SizeFilter(props: Props) {
  const { property = 'size' } = props;

  return (
    <Filter
      className={props.className}
      facet={props.facet}
      getFacetValueForOption={getFacetValueForOption}
      header={<FilterHeader name={translate('metric_domain.Size')} />}
      highlightUnder={1}
      maxFacetValue={props.maxFacetValue}
      onQueryChange={props.onQueryChange}
      options={[1, 2, 3, 4, 5]}
      property={property}
      renderAccessibleLabel={renderAccessibleLabel}
      renderOption={renderOption}
      value={props.value}
    />
  );
}

function getFacetValueForOption(facet: Facet, option: number) {
  const map = ['*-1000.0', '1000.0-10000.0', '10000.0-100000.0', '100000.0-500000.0', '500000.0-*'];
  return facet[map[option - 1]];
}

function renderOption(option: number, selected: boolean) {
  return (
    <div className="display-flex-center">
      <SizeRating muted={!selected} value={getSizeRatingAverageValue(option)} />
      <span className="spacer-left">{getSizeRatingLabel(option)}</span>
    </div>
  );
}

function renderAccessibleLabel(option: number) {
  return translate('projects.facets.size.label', option.toString());
}
