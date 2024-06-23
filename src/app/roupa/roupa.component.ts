import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Roupa {
  id: number;
  nome: string;
  preco: string;
  prazo: string;
  dataInicioPreco: string;  // Novo campo
}

@Component({
  selector: 'app-roupa',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Importando CommonModule e FormsModule
  templateUrl: './roupa.component.html',
  styleUrls: ['./roupa.component.css']
})
export class RoupaComponent implements OnInit {
  roupas: Roupa[] = [];
  roupaSelecionada: Roupa = { id: 0, nome: '', preco: '', prazo: '', dataInicioPreco: '' };  // Inicializa o novo campo
  editando: boolean = false;
  nextId: number = 1;

  ngOnInit() {
    const roupasData = localStorage.getItem('roupas');
    if (roupasData) {
      this.roupas = JSON.parse(roupasData);
      this.nextId = this.roupas.length ? Math.max(...this.roupas.map(r => r.id)) + 1 : 1;
    } else {
      // Adiciona itens de exemplo se não houver dados no localStorage
      this.roupas = [
        { id: 1, nome: 'Camiseta Branca', preco: '29.99', prazo: '3 dias', dataInicioPreco: '2023-06-01' },
        { id: 2, nome: 'Calça Jeans', preco: '79.99', prazo: '5 dias', dataInicioPreco: '2023-06-02' }
      ];
      this.nextId = 3;
    }
  }

  iniciarInclusao() {
    this.roupaSelecionada = { id: 0, nome: '', preco: '', prazo: '', dataInicioPreco: '' };  // Inicializa o novo campo
    this.editando = true;
  }

  onSubmit() {
    if (this.roupaSelecionada.id === 0) {
      this.roupaSelecionada.id = this.nextId++;
      this.roupas.push({ ...this.roupaSelecionada });
    } else {
      const index = this.roupas.findIndex(r => r.id === this.roupaSelecionada.id);
      this.roupas[index] = { ...this.roupaSelecionada };
    }
    this.salvarDados();
    this.editando = false;
  }

  editarRoupa(roupa: Roupa) {
    this.roupaSelecionada = { ...roupa };
    this.editando = true;
  }

  cancelarEdicao() {
    this.editando = false;
  }

  deleteRoupa(id: number) {
    const confirmacao = confirm('Tem certeza que deseja excluir esta roupa?');
    if (confirmacao) {
      this.roupas = this.roupas.filter(r => r.id !== id);
      this.salvarDados();
    }
  }

  salvarDados() {
    localStorage.setItem('roupas', JSON.stringify(this.roupas));
  }
}
