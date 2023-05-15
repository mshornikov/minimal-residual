import numeric from 'numeric';

// Симметричность
function isSymmetric(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < i; j++) {
        if (matrix[i][j] !== matrix[j][i]) {
          return false;
        }
      }
    }
    return true;
}

// Позитивная определённость
function isPositiveDefinite(matrix) {
    const eigenvalues = numeric.eig(matrix).lambda.x;
    for (let i = 0; i < eigenvalues.length; i++) {
        if (eigenvalues[i] <= 0) {
        return false;
        }
    }
    return true;
}

function minResidual(A, f, x0, maxIter) {
    let x = x0.slice();
    
    // Начальный вектор невязки s = f - A * x 
    let s = numeric.sub(f, numeric.dot(A, x0));

    for (let iter = 0; iter < maxIter; iter++) {
        // Нахождение A*s
        let As = numeric.dot(A, s);

        let t = numeric.dot(As, s) / numeric.dot(As, As);

        // Нахождение приближения Xn+1 = Xn + tn * Sn
        x = numeric.add(x, numeric.mul(t, s));

        // Нахождение вектора невязки s = f - A * x
        s = numeric.sub(s, numeric.mul(t, As));
    }
    return x;
}

// Матрица А
let A = [[4, 2, -1], [2, 3, -1], [-1, -1, 5]];

// Вектор f
let f = [3, -2, -5];

// Начальное приближение
let x0 = [0, 0, 0];

// Количество приближений
let iterations = 20;

// Проверка на симметричность и положительную определённость (условие сходимости)
if (isSymmetric(A) && isPositiveDefinite(A)){
    let x = minResidual(A, f, x0, iterations);
    console.log('Решение:')
    console.log(x);
} else {
    console.log('Ошибка ввода матрицы. Метод не сходится');
}
