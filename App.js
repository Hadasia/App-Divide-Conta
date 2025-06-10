import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity,StyleSheet, SafeAreaView, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, Platform,} from 'react-native';

export default function App() {
  const [total, setTotal] = useState('');
  const [pessoas, setPessoas] = useState('');
  const [gorjeta, setGorjeta] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const totalNum = parseFloat(total.replace(',', '.'));
    const pessoasNum = parseInt(pessoas);
    const gorjetaNum = parseFloat(gorjeta.replace(',', '.')) || 0;

    if (!totalNum || !pessoasNum || pessoasNum <= 0) {
      setResultado('Preencha os campos corretamente.');
      return;
    }

    const totalComGorjeta = totalNum + (totalNum * gorjetaNum / 100);
    const valorPorPessoa = totalComGorjeta / pessoasNum;

    setResultado(`Cada pessoa deve pagar: R$ ${valorPorPessoa.toFixed(2).replace('.', ',')}`);
    Keyboard.dismiss();
  };

  const limpar = () => {
    setTotal('');
    setPessoas('');
    setGorjeta('');
    setResultado(null);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inner}
        >
          <Text style={styles.title}>Divide Conta</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Valor total da conta (R$)"
            placeholderTextColor="#a28fc4"
            value={total}
            onChangeText={setTotal}
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Número de pessoas"
            placeholderTextColor="#a28fc4"
            value={pessoas}
            onChangeText={setPessoas}
          />

          <TextInput
            style={styles.input} keyboardType="numeric" placeholder="Gorjeta [opcional]" placeholderTextColor="#a28fc4" value={gorjeta} onChangeText={setGorjeta}/>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={calcular}>
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={limpar}>
              <Text style={[styles.buttonText, styles.clearButtonText]}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {resultado && <Text style={styles.resultado}>{resultado}</Text>}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd', 
    paddingHorizontal: 20,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0d47a1', 
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#90caf9', 
    color: '#0d47a1',
    width: '90%',
    alignSelf: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#64b5f6', 
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: '#bbdefb', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  clearButtonText: {
    color: '#1565c0', 
  },
  resultado: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#1e88e5', 
  },
});
