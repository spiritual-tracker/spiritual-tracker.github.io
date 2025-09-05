import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { getLast7Days, getLast30Days } from '../shared/utils/dateUtils';

const AnalyticsSection = ({ selectedDate, data }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days');

  // Load historical data
  useEffect(() => {
    const loadHistoricalData = () => {
      const dates = selectedTimeframe === '7days' ? getLast7Days() : getLast30Days();
      const historical = dates.map(date => {
        const dateData = localStorage.getItem(`spiritual_tracker_${date}`);
        if (dateData) {
          const parsed = JSON.parse(dateData);
          return {
            date,
            armor: parsed.armor?.length || 0,
            sins: parsed.sins?.length || 0,
            fruits: parsed.fruits?.length || 0,
            flesh: parsed.flesh?.length || 0,
            total: (parsed.armor?.length || 0) + (parsed.fruits?.length || 0) - (parsed.sins?.length || 0) - (parsed.flesh?.length || 0)
          };
        }
        return {
          date,
          armor: 0,
          sins: 0,
          fruits: 0,
          flesh: 0,
          total: 0
        };
      });
      setHistoricalData(historical);
    };

    loadHistoricalData();
  }, [selectedTimeframe]);

  // Calculate today's summary metrics
  const todayMetrics = {
    armor: data.armor.length,
    sins: data.sins.length,
    fruits: data.fruits.length,
    flesh: data.flesh.length,
    spiritualScore: data.fruits.length + data.armor.length - data.sins.length - data.flesh.length
  };



  return (
    <div className="fade-in">
      <div className="row justify-content-center">
        <div className="col-12" style={{ maxWidth: '800px' }}>
          
          {/* Today's Summary Container */}
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">
                <i className="bi bi-graph-up me-2"></i>
                Today's Summary
              </h4>
              
              <div className="row text-center">
                <div className="col-3">
                  <div className="progress-circle armor mb-2">
                    {todayMetrics.armor}
                  </div>
                  <small className="text-muted">Armor Pieces</small>
                </div>
                <div className="col-3">
                  <div className="progress-circle fruits mb-2">
                    {todayMetrics.fruits}
                  </div>
                  <small className="text-muted">Fruits of Spirit</small>
                </div>
                <div className="col-3">
                  <div className="progress-circle sins mb-2">
                    {todayMetrics.sins}
                  </div>
                  <small className="text-muted">Sins</small>
                </div>
                <div className="col-3">
                  <div className="progress-circle flesh mb-2">
                    {todayMetrics.flesh}
                  </div>
                  <small className="text-muted">Works of Flesh</small>
                </div>
              </div>
              
              <div className="row mt-4">
                <div className="col-12 text-center">
                  <div className="alert alert-info">
                    <h5 className="mb-1">Spiritual Score: {todayMetrics.spiritualScore}</h5>
                    <small className="text-muted">
                      (Fruits + Armor) - (Sins + Flesh) = {todayMetrics.fruits} + {todayMetrics.armor} - {todayMetrics.sins} - {todayMetrics.flesh}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Container */}
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title mb-0">
                  <i className="bi bi-bar-chart me-2"></i>
                  Growth Trends & Insights
                </h4>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn btn-sm ${selectedTimeframe === '7days' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setSelectedTimeframe('7days')}
                  >
                    7 Days
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${selectedTimeframe === '30days' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setSelectedTimeframe('30days')}
                  >
                    30 Days
                  </button>
                </div>
              </div>

              {/* Trend Chart */}
              <div className="mb-4">
                <h6 className="text-muted mb-3">Spiritual Growth Trend</h6>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} name="Spiritual Score" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Comparison */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h6 className="text-muted mb-3">Positive vs Negative</h6>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={historicalData.slice(-7)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      />
                      <Legend />
                      <Bar dataKey="fruits" fill="#28a744" name="Fruits" />
                      <Bar dataKey="armor" fill="#ffc107" name="Armor" />
                      <Bar dataKey="sins" fill="#dc3545" name="Sins" />
                      <Bar dataKey="flesh" fill="#6c757d" name="Flesh" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="col-md-6 mb-4">
                  <h6 className="text-muted mb-3">Today's Distribution</h6>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Armor', value: todayMetrics.armor, color: '#ffc107' },
                          { name: 'Fruits', value: todayMetrics.fruits, color: '#28a744' },
                          { name: 'Sins', value: todayMetrics.sins, color: '#dc3545' },
                          { name: 'Flesh', value: todayMetrics.flesh, color: '#6c757d' }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {[
                          { name: 'Armor', value: todayMetrics.armor, color: '#ffc107' },
                          { name: 'Fruits', value: todayMetrics.fruits, color: '#28a744' },
                          { name: 'Sins', value: todayMetrics.sins, color: '#dc3545' },
                          { name: 'Flesh', value: todayMetrics.flesh, color: '#6c757d' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insights */}
              <div className="mt-4">
                <h6 className="text-muted mb-3">Insights</h6>
                <div className="row">
                  <div className="col-md-6">
                    <div className="alert alert-success">
                      <h6><i className="bi bi-arrow-up-circle me-2"></i>Strengths</h6>
                      <ul className="mb-0">
                        {todayMetrics.fruits > 0 && <li>Demonstrated {todayMetrics.fruits} fruits of the Spirit</li>}
                        {todayMetrics.armor > 0 && <li>Equipped {todayMetrics.armor} pieces of spiritual armor</li>}
                        {todayMetrics.spiritualScore > 0 && <li>Positive spiritual score of {todayMetrics.spiritualScore}</li>}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="alert alert-warning">
                      <h6><i className="bi bi-exclamation-triangle me-2"></i>Areas for Growth</h6>
                      <ul className="mb-0">
                        {todayMetrics.sins > 0 && <li>Struggled with {todayMetrics.sins} sins</li>}
                        {todayMetrics.flesh > 0 && <li>Manifested {todayMetrics.flesh} works of the flesh</li>}
                        {todayMetrics.spiritualScore <= 0 && <li>Focus on increasing positive spiritual practices</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
