import { createVForm, VForm } from './index';
import type { VFormItem, VFormItemTypes } from './renders';
import type { Merge } from './type-merge';
import type {  _DynamicDef, DeepKey, DynamicDef } from './types';
import { wrapDynamic } from './utils';

export type BuildTypes = Exclude<keyof VFormItemTypes & string, 'form' | 'build' | 'merge'>

type Builder_<T extends object, Configed extends object = {}> = {
  (): VFormItem<T, Extract<DeepKey<Configed>, DeepKey<T>>>[]
}

type Builder_Form<T extends object> = {
  (): VForm<T>
}

type UnConfigedKey<T extends object, Configed extends object> = Exclude<DeepKey<T>, keyof Configed>
interface Builder_Items<Type extends BuildTypes, T extends object, Configed extends object = {}> {
  <Key extends UnConfigedKey<T, Configed> = never>(
    config: DynamicDef<T, VFormItemTypes<T, Key>[Type]>
  ): Builder<T, Merge<Record<Key, Type>, Configed>>
}

type MergeResult<
  Source extends object, SourceConfig,
  IncommingConfig
  > =  keyof IncommingConfig extends DeepKey<Source>
    ? Builder<Source, Merge<IncommingConfig, SourceConfig>>
    : never

interface Builder_Merger<T extends object, Configed = {}> {
  <U extends object, _Configed extends object>(builder: Builder<U, _Configed>): MergeResult<T, Configed, _Configed>
}

type Builder_Methods = 'form'|'build' | 'merge' | BuildTypes

type BuilderInstance<Type extends Builder_Methods, T extends object, Configed extends object = {}> =
  | Type extends 'form' ? Builder_Form<T>
  : Type extends 'build' ? Builder_<T, Configed>
  : Type extends 'merge' ? Builder_Merger<T, Configed>
  : Type extends BuildTypes ? Builder_Items<Type, T, Configed>
  : never

export type Builder<T extends object, Configed extends object = {}> = {
  readonly [Type in Builder_Methods]: BuilderInstance<Type, T, Configed>
}

interface ProxyedConfig<T extends object> {
  _configs: {
    type: any,
    config: any
  }[]
}


export function useFormBuilder<T extends object>(data?: T): Builder<T> {
  return new Proxy<ProxyedConfig<T>>({ _configs: [] }, {
    get(target: ProxyedConfig<T>, prototype: string | symbol, receiver: any) {
      if (prototype == 'form') {
        return createVForm
      }
      if (prototype == 'build') {
        return function () {
          return (target._configs ?? []).map(wrapDynamic)
        }
      }
      if(prototype == 'merge'){
        return function(toMerge:any){
          target._configs.push(...toMerge.$raw)
          return receiver
        }
      }
      if(prototype == '$raw'){
        return target._configs ?? []
      }
      return (config: ProxyedConfig<T>) => {
        target._configs.push({
          type: prototype,
          config
        } as any)
        return receiver
      }
    }
  }) as any
}


